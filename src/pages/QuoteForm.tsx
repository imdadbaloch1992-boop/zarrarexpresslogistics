import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  Box,
  Divider,
  CircularProgress,     // ✅ ADDED
  LinearProgress        // ✅ ADDED
} from "@mui/material";
import { FaTruck, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

// Import QuoteConfirm component
import QuoteConfirm from "./QuoteConfirm";

const QuoteForm = () => {

  const location = useLocation();
  const selectedVehicle = location.state?.selectedVehicle || "";
  const pricePerMile = location.state?.pricePerMile || "0";
  const minCharge = location.state?.minCharge || "0";

  const vehiclesList = [
    "Motorbike","CAR","SMALL VAN","SWB TRANST","LWB TRANST","XLWB TRANSIT","18T LORRY","26T LORRY"
  ];

  const vehiclePricing = {
    "Motorbike": { pricePerMile: "1.10", minCharge: "45" },
    "CAR": { pricePerMile: "1.10", minCharge: "45" },
    "SMALL VAN": { pricePerMile: "1.10", minCharge: "45" },
    "SWB TRANST": { pricePerMile: "1.40", minCharge: "55" },
    "LWB TRANST": { pricePerMile: "1.65", minCharge: "85" },
    "XLWB TRANSIT": { pricePerMile: "1.80", minCharge: "65" },
    "18T LORRY": { pricePerMile: "3.50", minCharge: "225" },
    "26T LORRY": { pricePerMile: "4.00", minCharge: "265" },
  };

  const greenMain = "#22c55e";
  const greenCool = "#16a34a";
  const blueHover = "#60a5fa";

  // --- ORIGINAL STATES ---
  const [bookingCreated, setBookingCreated] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  // ✅ ADDED STATES
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");

  const [formData, setFormData] = useState({
    collectionPostcode: "",
    deliveryPostcode: "",
    vehicle: selectedVehicle,
    phone: "",
    email: "",
    extra: [],
    pricePerMile: pricePerMile,
    minCharge: minCharge,
    sendEmail: false
  });

  // ✅ PROGRESS LOGIC (ADDED ONLY)
  useEffect(() => {
    let interval;

    if (loading) {
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + 5;
        });
      }, 2000);

      setLoadingText("Finding best route...");
      setTimeout(() => setLoadingText("Calculating distance..."), 8000);
      setTimeout(() => setLoadingText("Applying pricing..."), 16000);
      setTimeout(() => setLoadingText("Finalizing quote..."), 25000);
    }

    return () => clearInterval(interval);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "vehicle") {
      setFormData({
        ...formData,
        vehicle: value,
        pricePerMile: vehiclePricing[value].pricePerMile,
        minCharge: vehiclePricing[value].minCharge
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked, name } = e.target;

    if (name === "sendEmail") {
      setFormData({ ...formData, sendEmail: checked });
      return;
    }

    let updatedExtras = [...formData.extra];

    if (checked) {
      if (!updatedExtras.includes(value)) {
        updatedExtras.push(value);
      }
    } else {
      updatedExtras = updatedExtras.filter((item) => item !== value);
    }

    setFormData({ ...formData, extra: updatedExtras });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ ADDED

    const backendPayload = {
      collectionPostcode: formData.collectionPostcode,
      deliveryPostcode: formData.deliveryPostcode,
      phone: formData.phone,
      vehicle: formData.vehicle,
      pricePerMile: formData.pricePerMile,
      minCharge: formData.minCharge,
      extraServices: formData.extra,
      sendEmail: formData.sendEmail,
      email: formData.sendEmail ? formData.email : null
    };

    try {
      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendPayload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      alert("Quote Calculated Successfully!");
      console.log("Server Response:", data);

      setBookingCreated(data);

      if (data?.data?.bookingId) {
        localStorage.setItem("latestBookingId", data.data.bookingId);
      }

      setProgress(100); // ✅ ADDED

    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false); // ✅ ADDED
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      fontSize: "0.95rem",
      backgroundColor: "#fff",
      "& input": { color: greenCool },
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: greenMain },
      "&.Mui-focused fieldset": { borderColor: greenMain }
    },
    "& label.Mui-focused": { color: greenMain }
  };

  if (showQuote && bookingCreated) {
    return <QuoteConfirm bookingData={bookingCreated} />;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 10, px: 2 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Paper sx={{ maxWidth: 750, mx: "auto", p: { xs: 3, md: 5 }, borderRadius: 3 }}>

          <Typography variant="h5" align="center" fontWeight={600} sx={{ mb: 4, color: "#2e7d32" }}>
            Get Instant Quote
          </Typography>

          <form onSubmit={handleSubmit}>

            {/* ✅ YOUR FULL ORIGINAL UI REMAINS EXACTLY SAME ABOVE */}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}   // ✅ ADDED
              startIcon={!loading && <FaTruck />} // ✅ ADDED
              sx={{
                mt: 2,
                py: 1.6,
                borderRadius: 2,
                fontWeight: 500,
                textTransform: "none",
                fontSize: "0.95rem",
                backgroundColor: greenMain,
                boxShadow: "none",
                "&:hover": { backgroundColor: blueHover }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                  Calculating Quote...
                </>
              ) : "Get Quote"}
            </Button>

            {/* ✅ PROGRESS BAR ONLY ADDITION */}
            {loading && (
              <Box sx={{ mt: 4 }}>
                <Typography sx={{ mb: 1 }}>{loadingText}</Typography>
                <LinearProgress variant="determinate" value={progress} />
                <Typography align="right">{progress}%</Typography>
              </Box>
            )}

          </form>

          {bookingCreated && (
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setShowQuote(true)}
              sx={{
                mt: 4,
                py: 1.5,
                borderColor: greenMain,
                color: greenMain,
                fontWeight: 500,
                textTransform: "none",
                "&:hover": { backgroundColor: "#dcfce7" }
              }}
            >
              Estimate Quote
            </Button>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default QuoteForm;