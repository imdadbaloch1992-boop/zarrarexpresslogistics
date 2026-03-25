// server/utils/stripeClient.js
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); // ⚠️ Must be before accessing process.env

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15"
});

export default stripe;