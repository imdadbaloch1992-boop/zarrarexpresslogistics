import express from "express";
import { createPaymentIntent, updatePayment } from "../controllers/stripeController.js";

const router = express.Router();

// Route: /api/stripe/create-payment-intent
router.post("/create-payment-intent", createPaymentIntent);

// Route: /api/stripe/update
router.post("/update", updatePayment);

export default router;