import React, { useState } from "react";
import { motion } from "motion/react";
import { Truck, ChevronRight, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading, PageTransition } from "../components/Layout";
import SEO from "../components/SEO";
import axios from "axios";
import { GiPartyPopper } from "react-icons/gi";
import emailjs from "@emailjs/browser";

const Fleet = () => {
  // ✅ Move state hooks INSIDE the component
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  // Validate form
  if (!formData.name || !formData.email || !formData.message) {
    alert("Please fill all fields");
    setLoading(false);
    return;
  }

  // Send email to owner
  emailjs
    .send(
      "service_rsxh1zi",      // EmailJS Service ID
      "template_hppc2tf",     // EmailJS Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "Wajahatahmed843@gmail.com", // Owner's email receives all queries
      },
      "Pi1QlqZa3VYwpBI7v"       // EmailJS Public Key
    )
    .then(
      (result) => {
        console.log(result.text);
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      },
      (error) => {
        console.error(error.text);
        alert("Failed to send enquiry. Please try again.");
        setLoading(false);
      }
    );
};

const vehicles = [
  {
    name: "Motorbike",
    capacity: "Up to 50kg",
    pricePerMile: "1.10",
    minCharge: "45",
    shortDesc: "Fast and efficient for urgent documents and small city deliveries.",
    image: "https://t4.ftcdn.net/jpg/06/26/80/37/360_F_626803765_fJYIZ4LLkLzFB6xD6XOdBCuACF79GXqL.jpg"
  },
  {
    name: "CAR",
    capacity: "Up to 200kg",
    pricePerMile: "1.10",
    minCharge: "45",
    shortDesc: "Ideal for light goods, small boxes and quick regional transport.",
    image: "https://www.gt-luxury.com/wp-content/uploads/2016/02/c63-s-png.png"
  },
  {
    name: "SMALL VAN",
    capacity: "Up to 350kg Weight",
    pricePerMile: "1.10",
    minCharge: "45",
    shortDesc: "Perfect for parcels, business supplies and local courier services.",
    image: "https://images.ctfassets.net/3xid768u5joa/4MMShLCWmSqR6XwbQS67wd/7cd262c810466e47d82c60b51df13eb6/Vauxhall_Vivaro.webp"
  },
  {
    name: "SWB TRANST",
    capacity: "Up to 800kg Weight",
    pricePerMile: "1.40",
    minCharge: "55",
    shortDesc: "Suitable for furniture, multiple boxes and commercial deliveries.",
    image: "https://media.istockphoto.com/id/818164446/photo/ford-transit.jpg?s=612x612&w=0&k=20&c=gIvQOzuZhw63hayjPIVt21jK50JSclN_3NsJ2YF-ors="
  },
  {
    name: "LWB TRANST",
    capacity: "Up to 1,100kg Weight",
    pricePerMile: "1.65",
    minCharge: "85",
    shortDesc: "Best for palletised goods, equipment transport and office moves.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/076/734/323/small/white-delivery-van-on-road-photo.jpg"
  },
  {
    name: "XLWB TRANSIT",
    capacity: "Up to 1,000kg (Tail Lift)",
    pricePerMile: "1.80",
    minCharge: "65",
    shortDesc: "Designed for bulky items requiring extra height and tail lift support.",
    image: "https://vanaways.co.uk/uploads/Luton-Box-With-500kg-Tail-Lift-image(1523x762-crop).png"
  },
  {
    name: "18T LORRY",
    capacity: "Up to 8000kg - 18,000kg",
    pricePerMile: "3.50",
    minCharge: "225",
    shortDesc: "Ideal for side-loading pallets and large-scale freight operations.",
    image: "https://alltruck.co.uk/uploads/vehicle/images/508/1_New_Mercedes_Arocs_2546_Curtainside__Copy___Copy_.jpg"
  },
  {
    name: "26T LORRY",
    capacity: "1300kg Weight",
    pricePerMile: "4.00",
    minCharge: "265",
    shortDesc: "Specialist transport for pharmaceuticals, food and sensitive goods.",
    image: "https://www.sanditruck.com/imgs/transporte-con-temperatura-comtrolada-12.jpg"
  }
];

  return (
    <PageTransition>
      <SEO
        title="Our Vehicle Fleet"
        description="Explore our diverse vehicle fleet, from small vans to heavy curtain-side vehicles. Tailored transport solutions for all cargo sizes across the UK."
        canonical="https://Logisticenterprise.co.uk/fleet"
      />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            title="Our Vehicle Fleet"
            subtitle="A modern fleet designed for deliveries of all sizes. From small vans to heavy freight vehicles."
            centered
          />

         <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {vehicles.map((vehicle, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900">
          {vehicle.capacity}
        </div>
      </div>

      <div className="p-8">

        {/* Vehicle Name */}
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          {vehicle.name}
        </h3>

        {/* Description (Soft & Clear) */}
        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
          {vehicle.shortDesc}
        </p>

        {/* Pricing Section */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-8 transition-all group-hover:border-emerald-200">

          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Info className="text-emerald-600 w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              £{vehicle.pricePerMile} per loaded mile
            </span>
          </div>

          <div className="text-sm text-slate-600 font-medium pl-11">
            Minimum Charge: <span className="text-emerald-600 font-semibold">£{vehicle.minCharge}</span>
          </div>

        </div>

        <Link
          to="/quote"
          state={{ 
             selectedVehicle: vehicle.name,
             pricePerMile: vehicle.pricePerMile,
             minCharge: vehicle.minCharge
               }}
          className="w-full bg-slate-50 text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-emerald-600 hover:text-white transition-all group/btn"
        >
          <span>Book this Vehicle</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>

      </div>
    </motion.div>
           ))}
         </div>

          {/* Consultation Section */}
          <div className="mt-32 bg-emerald-50 rounded-[3rem] p-12 md:p-20 border border-emerald-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Need a Specialist Vehicle?</h2>
                <p className="text-lg text-slate-600 mb-8">
                  If your cargo requires specific handling or a vehicle type not listed above, our logistics consultants can source 
                  the perfect transport solution for your requirements.
                </p>
                <div className="space-y-4">
                  {[
                    "ADR / Dangerous Goods Certified Vehicles",
                    "High-Security Escorted Transport",
                    "Oversized Load / Low-Loader Services",
                    "Tail-Lift & Two-Man Delivery Options"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                      <span className="text-slate-700 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 max-w-lg mx-auto">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Request a Vehicle Consultation
                </h3>

                {success ? (
                  <div className="text-green-700 font-semibold text-center flex items-center justify-left space-x-2">
                    <GiPartyPopper size={24} />
                    <span>Your enquiry has been sent successfully!</span>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your cargo requirements"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send Enquiry"}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Fleet;