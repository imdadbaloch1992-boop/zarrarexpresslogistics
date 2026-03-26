// --- REPLACE your current QuoteForm.tsx code with this fixed version ---
import { useLocation, useNavigate } from "react-router-dom"; // <-- added useNavigate
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
  Divider
} from "@mui/material";
import { FaTruck, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const QuoteForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // <-- added

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
  const blueHover = "#60a5fa";

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

      console.log("Server Response:", data);

      // ✅ Navigate to QuoteConfirm and pass data
      navigate("/confirm", { state: data });

    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      fontSize: "0.95rem",
      backgroundColor: "#fff",
      "& input": { color: "#16a34a" },
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: greenMain },
      "&.Mui-focused fieldset": { borderColor: greenMain }
    },
    "& label.Mui-focused": { color: greenMain }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 10, px: 2 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper sx={{ maxWidth: 750, mx: "auto", p: { xs: 3, md: 5 }, borderRadius: 3 }}>
          <Typography variant="h5" align="center" fontWeight={600} sx={{ mb: 4, color: "#2e7d32" }}>
            Get Instant Quote
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Postcode Inputs */}
            <TextField fullWidth required label="Collection Postcode" name="collectionPostcode" onChange={handleChange} sx={inputStyle} />
            <TextField fullWidth required label="Delivery Postcode" name="deliveryPostcode" onChange={handleChange} sx={inputStyle} />

            {/* Vehicle Type */}
            <FormControl fullWidth sx={inputStyle}>
              <InputLabel>Select Vehicle</InputLabel>
              <Select name="vehicle" value={formData.vehicle} onChange={handleChange} label="Select Vehicle">
                {vehiclesList.map((vehicle) => <MenuItem key={vehicle} value={vehicle}>{vehicle}</MenuItem>)}
              </Select>
            </FormControl>

            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2, py: 1.6, borderRadius: 2, fontWeight: 500, textTransform: "none", fontSize: "0.95rem", backgroundColor: greenMain, "&:hover": { backgroundColor: blueHover } }}>
              Get Quote
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default QuoteForm;