import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { motion } from "framer-motion";

interface BookingInfo {
  collectionPostcode: string;
  deliveryPostcode: string;
  vehicle: string;
  totalPrice: number;
}

const BookingDetails: React.FC = () => {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingId = localStorage.getItem("latestBookingId");

        if (!bookingId) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/bookings/booking/${bookingId}`
        );

        if (res.data.success) {
          setBookingInfo(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  if (loading) {
    return (
      <Box className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <Box className="text-center space-y-4">
          <CircularProgress sx={{ color: "#22c55e" }} />
          <Typography variant="h6" className="text-gray-700 font-semibold">
            Loading booking details...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!bookingInfo) {
    return (
      <Box className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <Paper className="p-10 text-center max-w-md w-full rounded-2xl shadow-lg border border-green-100">
          <Typography
            variant="h5"
            component="h2"
            className="text-red-600 font-bold mb-4"
          >
            Booking Not Found
          </Typography>

          <Typography className="text-gray-600">
            We could not find your booking details. Please contact support.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      {/* SEO */}
      <title>Booking Details | AMV Couriers</title>
      <meta
        name="description"
        content="View your courier booking details including collection postcode, delivery postcode, vehicle type and price."
      />

      <Box className="min-h-screen mt-8 bg-gray-50 py-14 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}

          <Box className="text-center mb-10">
            <Typography
              variant="h3"
              component="h1"
              className="font-bold text-gray-900 mb-3"
              sx={{ fontSize: { xs: "2rem", md: "2.7rem" } }}
            >
              Booking <span className="text-green-600">Confirmation</span>
            </Typography>

            <Typography className="text-gray-600 text-lg">
              Your courier booking details are shown below
            </Typography>
          </Box>

          {/* Booking Card */}

          <Paper className="p-6 sm:p-10 rounded-2xl shadow-md border border-gray-200 bg-white">
            <Typography className="text-sm uppercase tracking-wider text-green-600 font-semibold mb-6">
              Booking Summary
            </Typography>

            <Box className="space-y-5">

              <Box className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4">
                <Typography className="text-gray-600 font-medium">
                  Collection Postcode
                </Typography>

                <Typography className="text-gray-900 font-semibold text-lg">
                  {bookingInfo.collectionPostcode}
                </Typography>
              </Box>

              <Box className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4">
                <Typography className="text-gray-600 font-medium">
                  Delivery Postcode
                </Typography>

                <Typography className="text-gray-900 font-semibold text-lg">
                  {bookingInfo.deliveryPostcode}
                </Typography>
              </Box>

              <Box className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4">
                <Typography className="text-gray-600 font-medium">
                  Vehicle Type
                </Typography>

                <Typography className="text-gray-900 font-semibold text-lg">
                  {bookingInfo.vehicle}
                </Typography>
              </Box>

              <Box className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4">
                <Typography className="text-gray-800 font-bold text-xl">
                  Total Price
                </Typography>

                <Typography className="text-green-600 font-extrabold text-3xl">
                  £{bookingInfo.totalPrice?.toFixed(2)}
                </Typography>
              </Box>

            </Box>
          </Paper>

          {/* Info Section */}

          <Paper className="mt-8 p-6 sm:p-8 rounded-2xl shadow-sm border border-green-100 bg-white">
            <Typography className="font-semibold text-green-700 mb-3">
              Important Information
            </Typography>

            <Typography className="text-gray-600 text-sm leading-relaxed">
             <span className="font-medium">Note:</span> All prices are + VAT and are estimates only. Specialist vehicles and remote locations may vary the quote. Ferries or any other tolls (excluding London Congestion Charge and ULEZ) might need to be added. A vehicle selected is the minimum size we may send; if you need a specific vehicle due to height/access/weight restrictions, please let us know on booking. Motorcycles are generally only available around Central London; for other areas, a car or small van may be sent. Waiting/loading time charges vary per vehicle. To confirm a quote, please <a href="mailto:info@amvcouriers.co.uk" className="text-green-600 underline">Email</a>, WhatsApp, or call on 07984487447.


              <br />
              <br />

              To confirm your booking please{" "}
              <a
                href="mailto:info@amvcouriers.co.uk"
                className="text-green-600 font-medium underline"
              >
                Email us
              </a>{" "}
              or call{" "}
              <a
                href="tel:+447984487447"
                className="text-green-600 font-medium underline"
              >
                07984 487447
              </a>.
            </Typography>
          </Paper>

          <Box className="mt-6 flex justify-center">
 <Link
  to="/payment"
  state={{ totalPrice: bookingInfo.totalPrice }}
  className="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors"
>
  Proceed to Payment
</Link>
</Box>

        </motion.div>
      </Box>
    </>
  );
};

export default BookingDetails;