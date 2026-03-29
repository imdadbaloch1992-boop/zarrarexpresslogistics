import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Fixed import name from motion/react to framer-motion if applicable
import { Phone, Mail, Clock, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { SectionHeading, PageTransition } from '../components/Layout';
import SEO from '../components/SEO';
import axios from 'axios';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    companyName: '',
    collectionPostcode: '', // Ensure this matches your Controller
    requirements: '',      // Changed to string for easier email formatting
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pointing to your NEW Node.js backend route
      const response = await axios.post('/api/contact/create', formData);

      if (response.data.success) {
        setSubmitted(true);
        window.scrollTo(0, 0); // Scroll up to show the success message
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO 
        title="Contact Us | Get a Quote"
        description="Get a fast logistics quote or book a consultation with Zarrar Logistic. Our nationwide branch network is ready to support your delivery needs."
        canonical="https://logisticsenterprise.co.uk/contact"
      />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Get a Quote / Book a Consultation" 
            subtitle="Your local Zarrar Logistic branch will contact you shortly to discuss your requirements."
            centered
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      <Phone className="text-emerald-400 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Call Us</div>
                      <div className="text-lg font-bold">+44 7466 452195</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      <Mail className="text-emerald-400 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Email Us</div>
                      <div className="text-lg font-bold">support@zarrarexpresslogistics.co.uk</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      <Clock className="text-emerald-400 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Working Hours</div>
                      <div className="text-lg font-bold">Mon – Sun | 8:00 – 20:00</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      <MapPin className="text-emerald-400 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Head Office</div>
                      <div className="text-lg font-bold">London, United Kingdom</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                <h4 className="font-bold text-slate-900 mb-4">Why Consult with Us?</h4>
                <ul className="space-y-3">
                  {[
                    "Expert Logistics Analysis",
                    "Custom Cost Saving Strategies",
                    "Dedicated Account Management",
                    "Compliance & Regulatory Guidance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-sm text-slate-700">
                      <CheckCircle2 className="text-emerald-600 w-4 h-4" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-emerald-100 rounded-3xl p-12 text-center shadow-xl shadow-emerald-900/5"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-emerald-600 w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Thank You!</h3>
                  <p className="text-slate-600 mb-8">
                    Your request has been received. A logistics specialist will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-900/5 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">First Name</label>
                      <input
                        name="firstName"
                        required
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Last Name</label>
                      <input
                        name="lastName"
                        required
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <input
                        name="email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
                      <input
                        name="mobileNumber"
                        required
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Company Name (Optional)</label>
                      <input
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Your Company Ltd"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Collection Postcode</label>
                      <input
                        name="collectionPostcode"
                        required
                        type="text"
                        value={formData.collectionPostcode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Logistics Requirements</label>
                    <select
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="">Select an option</option>
                      <option value="Same Day Delivery">Same Day Delivery</option>
                      <option value="Next Day Delivery">Next Day Delivery</option>
                      <option value="Scheduled Routes">Scheduled Routes</option>
                      <option value="International Shipping">International Shipping</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      required
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-500 leading-relaxed">
                      I agree to receive communication regarding my enquiry.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center space-x-3",
                      loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-emerald-600 shadow-slate-900/20"
                    )}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;