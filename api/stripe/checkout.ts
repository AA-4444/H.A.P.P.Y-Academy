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

	const session = await stripe.checkout.sessions.create({
	  mode,
	  line_items: [{ price: priceId, quantity: 1 }],

	  metadata: {
		offerId,
		offerTitle,
		name,
		contact,
		comment,
		pageUrl,
	  },

	  
	  success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&offerId=${encodeURIComponent(
		offerId
	  )}`,
	  cancel_url: `${origin}/payment/cancel?offerId=${encodeURIComponent(offerId)}`,
	});

	return res.status(200).json({ ok: true, url: session.url });
  } catch (e: any) {
	return res.status(500).json({ ok: false, error: e?.message ?? String(e) });
  }
}