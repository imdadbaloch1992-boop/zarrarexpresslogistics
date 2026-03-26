import { useLocation } from "react-router-dom";
import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const QuoteConfirm = () => {
  const location = useLocation();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Typography variant="h5" color="red">Booking data not found</Typography>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen mt-8 bg-gray-50 py-14 px-4">
      <Paper className="p-6 sm:p-10 rounded-2xl shadow-md border bg-white max-w-md mx-auto">
        <Typography variant="h4" fontWeight="bold" color="green" mb={2}>
          Quote Confirmed!
        </Typography>

        <Typography variant="body1">
          Collection Postcode: {bookingData.collectionPostcode}
        </Typography>
        <Typography variant="body1">
          Delivery Postcode: {bookingData.deliveryPostcode}
        </Typography>
        <Typography variant="body1">
          Vehicle: {bookingData.vehicle}
        </Typography>
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Total Price: £{bookingData.totalPrice?.toFixed(2)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default QuoteConfirm;