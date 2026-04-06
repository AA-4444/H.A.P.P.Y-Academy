import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover",
});

type Body = {
  offerId?: string;
  offerTitle?: string;
  name?: string;
  contact?: string;
  country?: string;
  comment?: string;
  pageUrl?: string;
  leadId?: string;
  stage?: "pre_payment" | "paid";
  amount?: string;
  email?: string;
  telegramUsername?: string;
  phone?: string;
};

const PRICE_BY_OFFER: Record<string, string | undefined> = {
  system: process.env.STRIPE_PRICE_SYSTEM,
  club: process.env.STRIPE_PRICE_CLUB,
  marathon: process.env.STRIPE_PRICE_MARATHON,
};

const MODE_BY_OFFER: Record<string, Stripe.Checkout.SessionCreateParams.Mode> = {
  system: "payment",
  club: "subscription",
  marathon: "payment",
};

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

const MARATHON_GROUP_URL =
  process.env.MARATHON_GROUP_URL || "https://t.me/+2unNB9i9rW0xNjEy";

async function sendTelegram(text: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    throw new Error("Missing TG_BOT_TOKEN or TG_CHAT_ID env");
  }

  const resp = await fetch(
    `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(
      `Telegram sendMessage failed ${resp.status}: ${JSON.stringify(data)}`
    );
  }
}

function makeLeadId() {
  return `lead_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function esc(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizeTelegramUsername(value: string) {
  const v = String(value || "").trim().replace(/^@+/, "");
  return v ? `@${v}` : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function isValidTelegramUsername(value: string) {
  return /^@[a-zA-Z0-9_]{4,31}$/.test(String(value || "").trim());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({ ok: false, error: "Missing STRIPE_SECRET_KEY" });
    }

    const body: Body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};

    const offerId = (body.offerId ?? "").trim();
    const offerTitle = (body.offerTitle ?? "").trim();
    const name = (body.name ?? "").trim();
    const contact = (body.contact ?? "").trim();
    const comment = (body.comment ?? "").trim();
    const country = (body.country ?? "").trim();
    const pageUrl = (body.pageUrl ?? "").trim();
    const stage = body.stage ?? "pre_payment";
    const leadId = (body.leadId ?? "").trim() || makeLeadId();

    const email = (body.email ?? "").trim();
    const telegramUsername = normalizeTelegramUsername(body.telegramUsername ?? "");
    const phone = (body.phone ?? "").trim();

    if (!offerId || name.length < 2) {
      return res.status(400).json({ ok: false, error: "Validation failed" });
    }

    const origin =
      (req.headers.origin as string) ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    if (stage === "pre_payment" && offerId !== "marathon") {
      const safeContact = contact || phone;

      if (safeContact.length < 5) {
        return res.status(400).json({ ok: false, error: "Validation failed" });
      }

      const msg =
        `🟡 <b>Новая заявка (ожидает оплату)</b>\n` +
        `\n<b>Offer:</b> ${esc(offerTitle || offerId)} (${esc(offerId)})` +
        `\n<b>Name:</b> ${esc(name)}` +
        `\n<b>Contact:</b> ${esc(safeContact)}` +
        (country ? `\n<b>Country:</b> ${esc(country)}` : "") +
        (comment ? `\n<b>Comment:</b> ${esc(comment)}` : "") +
        (pageUrl ? `\n<b>Page:</b> ${esc(pageUrl)}` : "") +
        `\n<b>LeadId:</b> ${esc(leadId)}`;

      await sendTelegram(msg);
    }

    if (offerId === "ambassador") {
      const rawAmount = (body.amount ?? "").toString().trim();
      const donation = Number(rawAmount.replace(",", "."));

      if (isNaN(donation) || donation < 5 || donation > 50000) {
        return res.status(400).json({
          ok: false,
          error: "Invalid donation amount",
        });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Амбассадор счастья — Донат",
              },
              unit_amount: Math.round(donation * 100),
            },
            quantity: 1,
          },
        ],
        metadata: {
          leadId,
          stage,
          offerId,
          offerTitle,
          country,
          name,
          contact,
          comment,
          pageUrl,
          donationAmount: donation.toString(),
        },
        success_url: `${origin}/payment/ambassador-success?session_id={CHECKOUT_SESSION_ID}&leadId=${encodeURIComponent(
          leadId
        )}`,
        cancel_url: `${origin}/payment/cancel?offerId=${encodeURIComponent(
          offerId
        )}&leadId=${encodeURIComponent(leadId)}`,
      });

      return res.status(200).json({ ok: true, url: session.url, leadId });
    }

    if (offerId === "marathon") {
      if (
        !isValidEmail(email) ||
        !isValidTelegramUsername(telegramUsername) ||
        phone.length < 5 ||
        country.length === 0
      ) {
        return res.status(400).json({
          ok: false,
          error: "Validation failed for marathon",
        });
      }

      const priceId = PRICE_BY_OFFER.marathon;
      if (!priceId) {
        return res.status(400).json({
          ok: false,
          error: "Missing price for offerId=marathon",
        });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: priceId, quantity: 1 }],
        customer_email: email,
        metadata: {
          leadId,
          stage,
          offerId,
          offerTitle,
          country,
          name,
          email,
          telegramUsername,
          phone,
          comment,
          pageUrl,
        },
        success_url: MARATHON_GROUP_URL,
        cancel_url: `${origin}/payment/cancel?offerId=${encodeURIComponent(
          offerId
        )}&leadId=${encodeURIComponent(leadId)}`,
      });

      return res.status(200).json({ ok: true, url: session.url, leadId });
    }

    const priceId = PRICE_BY_OFFER[offerId];
    if (!priceId) {
      return res.status(400).json({
        ok: false,
        error: `Missing price for offerId=${offerId}`,
      });
    }

    const mode = MODE_BY_OFFER[offerId];
    if (!mode) {
      return res
        .status(400)
        .json({ ok: false, error: `Unknown offerId=${offerId}` });
    }

    const successPath = "success";

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        leadId,
        stage,
        offerId,
        offerTitle,
        country,
        name,
        contact,
        comment,
        pageUrl,
      },
      success_url: `${origin}/payment/${successPath}?session_id={CHECKOUT_SESSION_ID}&offerId=${encodeURIComponent(
        offerId
      )}&leadId=${encodeURIComponent(leadId)}`,
      cancel_url: `${origin}/payment/cancel?offerId=${encodeURIComponent(
        offerId
      )}&leadId=${encodeURIComponent(leadId)}`,
    });

    return res.status(200).json({ ok: true, url: session.url, leadId });
  } catch (e: any) {
    return res
      .status(500)
      .json({ ok: false, error: e?.message ?? String(e) });
  }
}