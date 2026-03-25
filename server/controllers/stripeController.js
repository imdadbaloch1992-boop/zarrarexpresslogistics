import stripe from "../utils/stripeClient.js";
import Payment from "../models/Payment.js";

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    let { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    currency = currency || "usd";

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe requires integer
      currency: currency,
      automatic_payment_methods: { enabled: true }
    });

    const payment = new Payment({
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: "pending"
    });

    await payment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (err) {
    console.error("Stripe PaymentIntent Error:", err);

    res.status(500).json({
      message: "Payment Intent creation failed",
      error: err.message
    });
  }
};


// Stripe Webhook
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

    console.log("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);

  }


  // PAYMENT SUCCESS
  if (event.type === "payment_intent.succeeded") {

    const paymentIntent = event.data.object;

    try {

      // Update DB
      const payment = await Payment.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: "succeeded" },
        { new: true }
      );

      // ⚡ Create payout to bank
      if (payment) {

        const payout = await stripe.payouts.create({
          amount: paymentIntent.amount_received,
          currency: paymentIntent.currency
        });

        console.log("Payout created:", payout.id);

      }

    } catch (error) {

      console.error("Error processing payout:", error);

    }

  }

  res.json({ received: true });
};



export const updatePayment = async (req, res) => {

  try {

    const { paymentIntentId, status } = req.body;

    if (!paymentIntentId || !status) {

      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });

    }

    const payment = await Payment.findOne({ paymentIntentId });

    if (!payment) {

      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });

    }

    payment.status = status;

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};