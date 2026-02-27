import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
	const { session_id } = req.query;

	if (!session_id || typeof session_id !== "string") {
	  return res.status(400).json({ error: "Missing session_id" });
	}

	const session = await stripe.checkout.sessions.retrieve(session_id);

	return res.status(200).json({
	  amount: session.amount_total,
	  currency: session.currency,
	  payment_status: session.payment_status,
	});
  } catch (err: any) {
	return res.status(500).json({ error: err.message });
  }
}