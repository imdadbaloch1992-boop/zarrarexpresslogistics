import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, default: "usd" },
  paymentIntentId: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);