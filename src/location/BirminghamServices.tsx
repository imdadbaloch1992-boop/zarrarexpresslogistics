import React, { useEffect, useState } from "react";
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
    title: "Same Day Courier Birmingham",
    desc: "Fast and urgent same-day delivery across Birmingham and nearby areas.",
  },
  {
    icon: <FaTruck size={35} />,
    title: "Next Day Delivery",
    desc: "Reliable next-day parcel delivery across Birmingham for businesses and individuals.",
  },
  {
    icon: <FaLock size={35} />,
    title: "Secure Parcel Handling",
    desc: "Your parcels are handled with maximum safety and full tracking support.",
  },
  {
    icon: <FaClock size={35} />,
    title: "24/7 Courier Service",
    desc: "Available 24/7 for urgent deliveries across Birmingham.",
  },
 {
  icon: <FaMapMarkedAlt size={35} />,
  title: "Birmingham Wide Coverage",
  desc: "Serving Solihull, Sutton Coldfield, Digbeth & Harborne.",
},
];

const features = [
  "Real-time parcel tracking in Birmingham",
  "Experienced local Birmingham drivers",
  "Affordable courier pricing across Birmingham",
  "Business & personal delivery solutions",
  "Fast pickup within 60 minutes",
];

const BirminghamServices = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  const slideInRight = {
  hidden: { opacity: 0, x: 200 }, // start off-screen right
  show: { opacity: 1, x: 0 }, // slide to original position
};

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Birmingham Courier Services | Same Day Delivery Birmingham</title>
        <meta
          name="description"
          content="Professional courier services in Birmingham. Same day delivery, secure parcel handling, and reliable courier solutions across Birmingham and surrounding areas."
        />
        <meta
          name="keywords"
          content="Birmingham courier, same day delivery Birmingham, parcel service Birmingham, courier UK"
        />
      </Helmet>

      <Box className="bg-gradient-to-b from-gray-50 to-white min-h-screen mt-8 py-14 px-4 md:px-10">
        
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 transform transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Typography
            variant="h3"
            className="font-extrabold text-green-800 mb-3 tracking-tight"
          >
            Reliable Birmingham Courier Services
          </Typography>

          <Typography className="text-gray-600 text-lg leading-relaxed">
            Fast, secure and same-day delivery services across Birmingham.
            Designed for businesses and individuals who need speed, reliability
            and trusted courier solutions.
          </Typography>
        </div>

        
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

        {/* Services */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mb-20">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden rounded-2xl border border-gray-100 
              shadow-md transition-all duration-700 group bg-white
              hover:-translate-y-2 hover:shadow-2xl ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <CardContent className="relative z-10 text-center py-10 px-6">
                
                <div className="flex justify-center mb-5 text-green-700 
                group-hover:scale-125 group-hover:text-green-800 transition duration-300">
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

                <Typography className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-700 transition">
                  {service.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <Box
          className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto border border-gray-100 
          transform transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Typography
            variant="h5"
            className="text-center font-bold text-green-800 mb-10"
          >
            Why Choose Our Birmingham Courier Service?
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

        {/* Footer */}
        <Typography className="text-center text-gray-500 mt-14 text-sm">
          Your trusted courier partner in Birmingham — fast, secure & reliable delivery.
        </Typography>
      </Box>
    </>
  );
};

export default BirminghamServices;