import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useState } from "react";
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
  LinearProgress // Added for the animated bar
} from "@mui/material";
import { FaTruck, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const QuoteForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for automatic redirect

  const selectedVehicle = location.state?.selectedVehicle || "";
  const pricePerMile = location.state?.pricePerMile || "0";
  const minCharge = location.state?.minCharge || "0";

  const vehiclesList = [
    "Motorbike",
    "CAR",
    "SMALL VAN",
    "SWB TRANST",
    "LWB TRANST",
    "XLWB TRANSIT",
    "18T LORRY",
    "26T LORRY"
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

  // --- NEW STATES ---
  const [loading, setLoading] = useState(false); // Progress bar state

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
      if (!updatedExtras.includes(value)) updatedExtras.push(value);
    } else {
      updatedExtras = updatedExtras.filter((item) => item !== value);
    }
    setFormData({ ...formData, extra: updatedExtras });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the animated progress bar

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

      if (data?.data?.bookingId) {
        localStorage.setItem("latestBookingId", data.data.bookingId);
        // AUTOMATIC REDIRECT: Moves to confirm page and passes data
        setTimeout(() => {
          navigate("/confirm", { state: { bookingData: data } });
        }, 1500); // Small delay so user sees the progress bar finish
      }

    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
      setLoading(false); // Stop loading if error happens
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

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 10, px: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            maxWidth: 750,
            mx: "auto",
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Animated Progress Bar at top of card */}
          {loading && (
            <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
              <LinearProgress sx={{ backgroundColor: "#dcfce7", "& .MuiLinearProgress-bar": { backgroundColor: greenMain } }} />
            </Box>
          )}

          <Typography
            variant="h5"
            align="center"
            fontWeight={600}
            sx={{ mb: 4, color: "#2e7d32" }}
          >
            {loading ? "Calculating Your Quote..." : "Get Instant Quote"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Typography fontWeight={500} sx={{ mb: 2 }}>Route Details</Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, mb: 5 }}>
              <TextField
                fullWidth required label="Collection Postcode" name="collectionPostcode"
                onChange={handleChange} sx={inputStyle}
                InputProps={{ startAdornment: <FaMapMarkerAlt className="mr-2 text-gray-400" /> }}
              />
              <TextField
                fullWidth required label="Delivery Postcode" name="deliveryPostcode"
                onChange={handleChange} sx={inputStyle}
                InputProps={{ startAdornment: <FaMapMarkerAlt className="mr-2 text-gray-400" /> }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth required label="Mobile Phone" name="phone" placeholder="+44 7123 456789"
                onChange={handleChange} sx={inputStyle}
                InputProps={{ startAdornment: <FaPhone className="mr-2 text-gray-400" /> }}
              />
            </Box>

            <Typography fontWeight={500} sx={{ mb: 2 }}>Vehicle Type</Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 5 }}>
              <FormControl fullWidth sx={inputStyle}>
                <InputLabel>Select Vehicle</InputLabel>
                <Select
                  name="vehicle" value={formData.vehicle}
                  onChange={handleChange} label="Select Vehicle"
                >
                  {vehiclesList.map((vehicle) => (
                    <MenuItem key={vehicle} value={vehicle}>{vehicle}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Price per loaded mile: £{formData.pricePerMile} | Minimum Charge: £{formData.minCharge}
              </Typography>
            </Box>

            <Typography fontWeight={500} sx={{ mb: 2 }}>Additional Services</Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
              {["Out Of Hours", "Congestion Charge", "ULEZ Charge"].map((item, index) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox value={item} onChange={handleCheckbox} sx={{ "&.Mui-checked": { color: greenMain } }} />}
                  label={
                    <Box>
                      <Typography sx={{ fontSize: "0.9rem" }}>{item}</Typography>
                      {index === 0 && (
                        <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mt: 0.3 }}>
                          (8:00–06:00) Mon–Fri or Anytime at Weekends/Bank holidays
                        </Typography>
                      )}
                    </Box>
                  }
                />
              ))}
            </Box>

            <FormControlLabel
              control={<Checkbox name="sendEmail" checked={formData.sendEmail} onChange={handleCheckbox} sx={{ "&.Mui-checked": { color: greenMain } }} />}
              label={<Typography sx={{ fontSize: "0.9rem" }}>Receive quote by email</Typography>}
            />

            {formData.sendEmail && (
              <Box sx={{ mt: 2, mb: 4 }}>
                <TextField fullWidth type="email" name="email" label="Email Address" onChange={handleChange} sx={inputStyle} />
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={loading ? null : <FaTruck />}
              sx={{
                mt: 2, py: 1.6, borderRadius: 2, fontWeight: 500, textTransform: "none", fontSize: "0.95rem",
                backgroundColor: greenMain, boxShadow: "none", "&:hover": { backgroundColor: blueHover }
              }}
            >
              {loading ? "Processing..." : "Get Quote"}
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default QuoteForm;