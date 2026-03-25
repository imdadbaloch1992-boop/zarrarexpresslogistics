import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    collectionPostcode: {
      type: String,
      required: true,
      trim: true,
    },

    deliveryPostcode: {
      type: String,
      required: true,
      trim: true,
    },

    vehicle: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Vehicle pricing info (protected against NaN)
    pricePerMile: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: {
        validator: (val) => !isNaN(val),
        message: "pricePerMile must be a valid number",
      },
    },

    minCharge: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: {
        validator: (val) => !isNaN(val),
        message: "minCharge must be a valid number",
      },
    },

    miles: {
      type: Number,
      min: 0,
      default: 0,
      validate: {
        validator: (val) => !isNaN(val),
        message: "miles must be a valid number",
      },
    },

    totalPrice: {
      type: Number,
      min: 0,
      default: 0,
      validate: {
        validator: (val) => !isNaN(val),
        message: "totalPrice must be a valid number",
      },
    },

    extraServices: {
      type: [String],
      default: [],
    },
    phone: {
     type: String,
     required: true,
     trim: true,
     },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    sendEmail: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);