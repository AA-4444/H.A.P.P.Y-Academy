type Body = {
  offerId?: string;
  offerTitle?: string;
  name?: string;
  contact?: string;
  country?: string
  comment?: string;
  pageUrl?: string;
};

function escapeHtml(s: string) {
  return String(s)
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;");
}

function setCors(res: any) {
  // Даже если same-origin — не мешает. Если вдруг домены/проксирование — спасает.
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader?.("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req: any, res: any) {
  try {
	setCors(res);

	// ✅ preflight
	if (req.method === "OPTIONS") {
	  return res.status(204).end();
	}

	// ✅ удобно проверять в браузере
	if (req.method === "GET") {
	  return res.status(200).json({ ok: true, status: "leads endpoint is alive" });
	}

	if (req.method !== "POST") {
	  res.setHeader?.("Allow", "POST, OPTIONS, GET");
	  return res.status(405).json({ ok: false, error: "Method Not Allowed" });
	}

	const BOT_TOKEN = process.env.TG_BOT_TOKEN;
	const CHAT_ID = process.env.TG_CHAT_ID;

	if (!BOT_TOKEN || !CHAT_ID) {
	  return res.status(500).json({
		ok: false,
		error: "Missing TG_BOT_TOKEN or TG_CHAT_ID in env",
	  });
	}

	let body: Body = {};
	try {
	  body =
		typeof req.body === "string"
		  ? JSON.parse(req.body)
		  : (req.body ?? {});
	} catch {
	  return res.status(400).json({ ok: false, error: "Bad JSON" });
	}

	const name = (body.name ?? "").trim();
	const contact = (body.contact ?? "").trim();
	const country = (body.country ?? "").trim();
	const comment = (body.comment ?? "").trim();
	const offerId = (body.offerId ?? "").trim();
	const offerTitle = (body.offerTitle ?? "").trim();
	const pageUrl = (body.pageUrl ?? "").trim();

	if (name.length < 2 || contact.length < 5) {
	  return res.status(400).json({ ok: false, error: "Validation failed" });
	}

	const lines: string[] = [];
	lines.push("🧩 <b>Новая заявка</b>");
	if (offerTitle || offerId)
	  lines.push(`📦 <b>Продукт:</b> ${escapeHtml(offerTitle || offerId)}`);
	lines.push(`👤 <b>Имя:</b> ${escapeHtml(name)}`);
	lines.push(`📞 <b>Контакт:</b> ${escapeHtml(contact)}`);
	if (country) lines.push(`🌍 <b>Страна:</b> ${escapeHtml(country)}`);
	if (comment) lines.push(`💬 <b>Комментарий:</b> ${escapeHtml(comment)}`);
	if (pageUrl) lines.push(`🔗 <b>Страница:</b> ${escapeHtml(pageUrl)}`);
	lines.push(`🕒 <b>Время:</b> ${escapeHtml(new Date().toLocaleString("ru-RU"))}`);

	// В большинстве рантаймов fetch есть. Если нет — кинем понятную ошибку.
	if (typeof fetch !== "function") {
	  return res.status(500).json({ ok: false, error: "fetch is not available in runtime" });
	}

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
	try {
	  tgJson = tgText ? JSON.parse(tgText) : {};
	} catch {
	  tgJson = { raw: tgText };
	}

	if (!tgRes.ok || tgJson?.ok === false) {
	  return res.status(502).json({
		ok: false,
		error: "Telegram API error",
		details: tgJson,
	  });
	}

	return res.status(200).json({ ok: true });
  } catch (e: any) {
	return res.status(500).json({
	  ok: false,
	  error: e?.message ?? String(e),
	  stack: e?.stack ?? null,
	});
  }
}