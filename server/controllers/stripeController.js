import stripe from "../utils/stripeClient.js";
import Payment from "../models/Payment.js";

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    let { amount, currency } = req.body;

    if (!amount) {
      console.error("❌ Payment Error: Amount is missing in request body");
      return res.status(400).json({ message: "Amount is required" });
    }

    // Default to GBP since you are in the UK, or use currency from body
    const finalCurrency = currency || "gbp";

    console.log(`Attempting to create PaymentIntent: ${amount} ${finalCurrency}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to pence/cents
      currency: finalCurrency,
      automatic_payment_methods: { enabled: true }
    });

    const payment = new Payment({
      amount,
      currency: finalCurrency,
      paymentIntentId: paymentIntent.id,
      status: "pending"
    });

    await payment.save();

    console.log("✅ PaymentIntent created successfully:", paymentIntent.id);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (err) {
    console.error("❌ Stripe PaymentIntent Error:", err.message);
    res.status(500).json({
      message: "Payment Intent creation failed",
      error: err.message
    });
  }
};

// Stripe Webhook Logic
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("⚠️ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    try {
      await Payment.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: "succeeded" },
        { new: true }
      );
      console.log("✅ Database updated: Payment succeeded", paymentIntent.id);
      
      // NOTE: Payouts are usually automatic. 
      // Manual payouts (stripe.payouts.create) often fail in test mode 
      // or if bank account is not fully setup.
    } catch (error) {
      console.error("❌ Error updating payment in DB:", error);
    }
  }

  res.json({ received: true });
};

export const updatePayment = async (req, res) => {
  try {
    const { paymentIntentId, status } = req.body;
    if (!paymentIntentId || !status) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const payment = await Payment.findOneAndUpdate(
        { paymentIntentId },
        { status },
        { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error("❌ Update Payment Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};