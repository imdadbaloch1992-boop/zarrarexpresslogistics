import express from "express";
import bodyParser from "body-parser";
import { createPaymentIntent, stripeWebhook, updatePayment } from "../controllers/stripeController.js";

const router = express.Router();

// Payment Intent
router.post("/create-payment-intent", createPaymentIntent);
router.post("/update", updatePayment);
// Webhook
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;