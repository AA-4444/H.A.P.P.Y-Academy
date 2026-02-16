import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

type Body = {
  offerId?: string;
  offerTitle?: string;
  name?: string;
  contact?: string;
  comment?: string;
  pageUrl?: string;

  // опционально, если ты пришлёшь с фронта
  leadId?: string;
  stage?: "pre_payment" | "paid";
};

const PRICE_BY_OFFER: Record<string, string | undefined> = {
  path: process.env.STRIPE_PRICE_PATH,
  club: process.env.STRIPE_PRICE_CLUB,
};

// ✅ club = подписка, path = разовая оплата
const MODE_BY_OFFER: Record<string, Stripe.Checkout.SessionCreateParams.Mode> = {
  path: "payment",
  club: "subscription",
};

// ===== Telegram =====
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

async function sendTelegram(text: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
	// Не падаем, но явно показываем причину (чтобы ты не гадал)
	throw new Error("Missing TG_BOT_TOKEN or TG_CHAT_ID env");
  }

  const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;

  const resp = await fetch(url, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
	  chat_id: TG_CHAT_ID,
	  text,
	  parse_mode: "HTML",
	  disable_web_page_preview: true,
	}),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
	throw new Error(`Telegram sendMessage failed ${resp.status}: ${JSON.stringify(data)}`);
  }
}

function makeLeadId() {
  // простой уникальный id без зависимостей
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function esc(s: string) {
  return String(s ?? "")
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
	if (req.method !== "POST") {
	  res.setHeader("Allow", "POST");
	  return res.status(405).json({ ok: false, error: "Method Not Allowed" });
	}

	if (!process.env.STRIPE_SECRET_KEY) {
	  return res.status(500).json({ ok: false, error: "Missing STRIPE_SECRET_KEY" });
	}

	const body: Body =
	  typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});

	const offerId = (body.offerId ?? "").trim();
	const offerTitle = (body.offerTitle ?? "").trim();
	const name = (body.name ?? "").trim();
	const contact = (body.contact ?? "").trim();
	const comment = (body.comment ?? "").trim();
	const pageUrl = (body.pageUrl ?? "").trim();

	// по умолчанию считаем, что это "pre_payment"
	const stage = body.stage ?? "pre_payment";

	// leadId либо приходит с фронта, либо генерим
	const leadId = (body.leadId ?? "").trim() || makeLeadId();

	if (!offerId || name.length < 2 || contact.length < 5) {
	  return res.status(400).json({ ok: false, error: "Validation failed" });
	}

	const priceId = PRICE_BY_OFFER[offerId];
	if (!priceId) {
	  return res.status(400).json({
		ok: false,
		error: `Missing price for offerId=${offerId}. Set STRIPE_PRICE_* env.`,
	  });
	}

	const mode = MODE_BY_OFFER[offerId];
	if (!mode) {
	  return res.status(400).json({ ok: false, error: `Unknown offerId=${offerId}` });
	}

	const origin =
	  (req.headers.origin as string) ||
	  process.env.NEXT_PUBLIC_SITE_URL ||
	  "http://localhost:3000";

	// ✅ 1) Сначала отправляем лид в Telegram (до оплаты)
	if (stage === "pre_payment") {
	  const msg =
		`🟡 <b>Новая заявка (ожидает оплату)</b>\n` +
		`\n<b>Offer:</b> ${esc(offerTitle || offerId)} (${esc(offerId)})` +
		`\n<b>Name:</b> ${esc(name)}` +
		`\n<b>Contact:</b> ${esc(contact)}` +
		(comment ? `\n<b>Comment:</b> ${esc(comment)}` : "") +
		(pageUrl ? `\n<b>Page:</b> ${esc(pageUrl)}` : "") +
		`\n<b>LeadId:</b> ${esc(leadId)}`;

	  await sendTelegram(msg);
	}

	// ✅ 2) Создаём Stripe session
	const session = await stripe.checkout.sessions.create({
	  mode,
	  line_items: [{ price: priceId, quantity: 1 }],

	  // ✅ важно: metadata должно содержать leadId, чтобы webhook мог найти “кого оплатили”
	  metadata: {
		leadId,
		stage, // pre_payment
		offerId,
		offerTitle,
		name,
		contact,
		comment,
		pageUrl,
	  },

	  success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&offerId=${encodeURIComponent(
		offerId
	  )}&leadId=${encodeURIComponent(leadId)}`,
	  cancel_url: `${origin}/payment/cancel?offerId=${encodeURIComponent(offerId)}&leadId=${encodeURIComponent(
		leadId
	  )}`,
	});

	return res.status(200).json({ ok: true, url: session.url, leadId });
  } catch (e: any) {
	// важно: показываем ошибку явно (так ты увидишь, если Telegram упал)
	return res.status(500).json({ ok: false, error: e?.message ?? String(e) });
  }
}