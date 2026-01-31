import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: { bodyParser: false }, 
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

function buffer(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
	const chunks: any[] = [];
	req.on("data", (chunk) => chunks.push(chunk));
	req.on("end", () => resolve(Buffer.concat(chunks)));
	req.on("error", reject);
  });
}

function escapeHtml(s: string) {
  return String(s)
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;");
}

async function sendTelegramFromLead(payload: {
  offerId?: string;
  offerTitle?: string;
  name?: string;
  contact?: string;
  comment?: string;
  pageUrl?: string;
  email?: string;
  amount?: string;
  currency?: string;
  subscriptionId?: string;
}) {
  const BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const CHAT_ID = process.env.TG_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
	throw new Error("Missing TG_BOT_TOKEN or TG_CHAT_ID in env");
  }

  const lines: string[] = [];
  lines.push("✅ <b>Оплата прошла</b>");
  if (payload.offerTitle || payload.offerId)
	lines.push(`📦 <b>Продукт:</b> ${escapeHtml(payload.offerTitle || payload.offerId)}`);
  if (payload.name) lines.push(`👤 <b>Имя:</b> ${escapeHtml(payload.name)}`);
  if (payload.contact) lines.push(`📞 <b>Контакт:</b> ${escapeHtml(payload.contact)}`);
  if (payload.comment) lines.push(`💬 <b>Комментарий:</b> ${escapeHtml(payload.comment)}`);
  if (payload.pageUrl) lines.push(`🔗 <b>Страница:</b> ${escapeHtml(payload.pageUrl)}`);

  if (payload.email) lines.push(`✉️ <b>Email:</b> ${escapeHtml(payload.email)}`);
  if (payload.amount && payload.currency)
	lines.push(`💳 <b>Сумма:</b> ${escapeHtml(payload.amount)} ${escapeHtml(payload.currency)}`);
  if (payload.subscriptionId)
	lines.push(`🧾 <b>Subscription:</b> ${escapeHtml(payload.subscriptionId)}`);

  lines.push(`🕒 <b>Время:</b> ${escapeHtml(new Date().toLocaleString("ru-RU"))}`);

  const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
	  chat_id: CHAT_ID,
	  text: lines.join("\n"),
	  parse_mode: "HTML",
	  disable_web_page_preview: true,
	}),
  });

  const tgText = await tgRes.text().catch(() => "");
  let tgJson: any = {};
  try { tgJson = JSON.parse(tgText); } catch { tgJson = { raw: tgText }; }

  if (!tgRes.ok || tgJson?.ok === false) {
	throw new Error(`Telegram API error: ${tgRes.status} ${tgText}`);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
	if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

	const sig = req.headers["stripe-signature"];
	const whSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!sig) return res.status(400).send("Missing stripe-signature");
	if (!whSecret) return res.status(500).send("Missing STRIPE_WEBHOOK_SECRET");

	const rawBody = await buffer(req);

	let event: Stripe.Event;
	try {
	  event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
	} catch (err: any) {
	  return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
	}

	
	if (event.type === "checkout.session.completed") {
	  const session = event.data.object as Stripe.Checkout.Session;

	 
	  const md = (session.metadata ?? {}) as Record<string, string>;

	  const amount =
		typeof session.amount_total === "number"
		  ? (session.amount_total / 100).toFixed(2)
		  : undefined;

	  await sendTelegramFromLead({
		offerId: md.offerId,
		offerTitle: md.offerTitle,
		name: md.name,
		contact: md.contact,
		comment: md.comment,
		pageUrl: md.pageUrl,
		email: session.customer_details?.email ?? undefined,
		amount,
		currency: session.currency?.toUpperCase(),
		subscriptionId: session.subscription ? String(session.subscription) : undefined,
	  });
	}

	return res.status(200).json({ received: true });
  } catch (e: any) {
	return res.status(500).send(e?.message ?? "Webhook handler error");
  }
}