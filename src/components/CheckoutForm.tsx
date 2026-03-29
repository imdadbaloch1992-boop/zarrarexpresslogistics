import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const location = useLocation();
  const { totalPrice } = (location.state as { totalPrice?: number }) || {
    totalPrice: 0,
  };

  // Create PaymentIntent on component mount
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!totalPrice || totalPrice <= 0) {
        setMessage("Invalid booking amount.");
        return;
      }

      try {
        // ✅ FIX: Removed localhost, use relative path
        const res = await axios.post("/api/stripe/create-payment-intent", {
          amount: totalPrice, // Your controller already handles the Math.round(*100)
          currency: "gbp",    // ✅ FIX: Using GBP for UK site
        });

        if (res?.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          setMessage("Failed to initialize payment.");
        }
      } catch (err: any) {
        console.error("PaymentIntent error:", err);
        setMessage(err.response?.data?.message || "Failed to initialize payment.");
      }
    };

    createPaymentIntent();
  }, [totalPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setMessage("Payment system not ready.");
      return;
    }

    setLoading(true);
    setMessage("");

    const card = elements.getElement(CardElement);

    if (!card) {
      setMessage("Card element not found.");
      setLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card },
        }
      );

      if (error) {
        setMessage(error.message || "Payment failed.");
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");

        // ✅ FIX: Pointing to correct backend route for updating status
        await axios.post("/api/stripe/update", {
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
        });
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      setMessage("Payment processing error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold' }}>
        Complete Your Payment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #e2e8f0",
            borderRadius: 1,
          }}
        >
          <CardElement options={CARD_OPTIONS} />
        </Box>

        <Button
          variant="contained"
          type="submit"
          disabled={!stripe || loading || !clientSecret}
          fullWidth
          sx={{ 
            py: 1.5, 
            backgroundColor: "#22c55e", 
            '&:hover': { backgroundColor: "#16a34a" },
            fontWeight: 'bold' 
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Pay £${Number(totalPrice).toFixed(2)}`
          )}
        </Button>
      </form>

      {message && (
        <Typography
          mt={2}
          textAlign="center"
          sx={{ 
            color: message.toLowerCase().includes("success") ? "#16a34a" : "#dc2626",
            fontWeight: 'medium'
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default CheckoutForm;