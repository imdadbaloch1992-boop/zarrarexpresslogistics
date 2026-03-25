import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import {
  FaTruck,
  FaLock,
  FaClock,
  FaMapMarkedAlt,
  FaShippingFast,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaShippingFast size={35} />,
    title: "Same Day Courier Manchester",
    desc: "Fast and urgent same-day deliveries across Greater Manchester.",
  },
  {
    icon: <FaTruck size={35} />,
    title: "Next Day Delivery",
    desc: "Reliable next-day parcel delivery across Manchester and nearby areas.",
  },
  {
    icon: <FaLock size={35} />,
    title: "Secure Parcel Handling",
    desc: "Your goods are delivered safely with full tracking and protection.",
  },
  {
    icon: <FaClock size={35} />,
    title: "24/7 Courier Service",
    desc: "Available day and night for urgent deliveries in Manchester.",
  },
  {
  icon: <FaMapMarkedAlt size={35} />,
  title: "Greater Manchester Coverage",
  desc: "Serving Salford, Bolton, Stockport & Trafford.",
},
];

const slideInRight = {
  hidden: { opacity: 0, x: 200 }, // start off-screen right
  show: { opacity: 1, x: 0 }, // slide to original position
};

const features = [
  "Real-time parcel tracking in Manchester",
  "Experienced local delivery drivers",
  "Affordable courier rates across Manchester",
  "Business & personal delivery solutions",
  "Fast pickup within 60 minutes",
];

// 🔥 Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ManchesterServices = () => {
  return (
    <>
      <Helmet>
        <title>Manchester Courier Services | Same Day Delivery Manchester</title>
        <meta
          name="description"
          content="Trusted courier services in Manchester. Same day delivery, secure parcel handling, and fast courier solutions across Greater Manchester."
        />
      </Helmet>

      <Box className="bg-gradient-to-b from-gray-50 to-white min-h-screen mt-8 py-14 px-4 md:px-10">
        
        {/* ✅ Header Animation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <Typography
            variant="h3"
            className="font-extrabold text-green-800 mb-3 tracking-tight"
          >
            Reliable Manchester Courier Services
          </Typography>

          <Typography className="text-gray-600 text-lg leading-relaxed">
            Fast, secure and same-day courier solutions across Manchester. Perfect
            for businesses and individuals who need quick and dependable delivery.
          </Typography>
        </motion.div>

        {/* Illustration Animation */}
        <motion.div
  variants={slideInRight}
  initial="hidden"
  animate="show"
  transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
  className="flex justify-center mb-16"
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
    alt="Birmingham Courier Service"
    className="w-44 md:w-64 hover:scale-110 transition duration-500"
  />
</motion.div>

        {/* ✅ Services Animation (Stagger Effect 🔥) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mb-20"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Card
                className="relative overflow-hidden rounded-2xl border border-gray-100 
                shadow-md transition-all duration-500 group bg-white
                hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <CardContent className="relative z-10 text-center py-10 px-6">
                  <div className="flex justify-center mb-5 text-green-700 
                  group-hover:scale-125 transition duration-300">
                    {service.icon}
                  </div>

                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800 mb-2 group-hover:text-green-900 transition"
                  >
                    {service.title}
                  </Typography>

                  <div className="w-10 h-[2px] bg-green-600 mx-auto mb-3 
                  group-hover:w-16 transition-all duration-300"></div>

                  <Typography className="text-gray-500 text-sm leading-relaxed">
                    {service.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Features Animation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
        >
          <Box className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto border border-gray-100">
            <Typography
              variant="h5"
              className="text-center font-bold text-green-800 mb-10"
            >
              Why Choose Our Manchester Courier Service?
            </Typography>

            <div className="flex flex-wrap gap-y-5 justify-between">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 w-full sm:w-[48%]"
                >
                  <span className="text-green-700 text-lg">✔</span>
                  <Typography className="text-gray-700 text-[15px]">
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          </Box>
        </motion.div>

        {/* Footer */}
        <Typography className="text-center text-gray-500 mt-14 text-sm">
          Your trusted courier partner in Manchester — fast, secure & reliable delivery.
        </Typography>
      </Box>
    </>
  );
};

export default ManchesterServices;