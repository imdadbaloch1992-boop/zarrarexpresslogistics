import React from "react";
import { Box, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe/stripe";
import CheckoutForm from "../components/CheckoutForm";
import { Helmet } from "react-helmet-async"; // SEO support

const PaymentPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f7fafc", p: 2 }}>
      
      {/* ✅ SEO Tags */}
      <Helmet>
        <title>Stripe Payment | AMV Couriers</title>
        <meta
          name="description"
          content="Complete your payment securely using Stripe. Enter your card details and confirm your booking with AMV Couriers."
        />
      </Helmet>

      {/* ✅ Heading */}
      <Typography
        variant="h4"
        textAlign="center"
        mt={8}
        sx={{ color: "#86efac" }} // light green
      >
        Stripe Payment
      </Typography>

      {/* ✅ Stripe Form */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Box>
  );
};

export default PaymentPage;