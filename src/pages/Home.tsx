import React from 'react';
import { motion } from 'motion/react';
import { Truck, Package, Shield, Clock, Search, ChevronRight, CheckCircle2, MapPin, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading, PageTransition } from '../components/Layout';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import PicHome  from '../images/PicHome.jpg';
import PicHome2 from "../images/PicHome2.jpg"
const Home = () => {
  const [postcode, setPostcode] = React.useState('');

  const services = [
    {
      title: "Same-Day Courier UK",
      desc: "Urgent door-to-door delivery nationwide with dedicated vehicles.",
      icon: Clock,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Freight Solutions",
      desc: "Comprehensive road, air, and sea freight for domestic and international needs.",
      icon: Truck,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Specialist Logistics",
      desc: "Expert handling for ADR, high-value, and oversized cargo.",
      icon: Shield,
      color: "bg-amber-50 text-amber-600"
    }
  ];

  const stats = [
    { label: "Nationwide Coverage", value: "100%" },
    { label: "On-Time Rate", value: "99.8%" },
    { label: "Vehicles", value: "500+" },
    { label: "Happy Clients", value: "10k+" }
  ];

  return (
    <PageTransition>
      <SEO 
        title="Fast & Reliable Logistics"
        description="Zarrar Logistic offers premier same-day courier and freight services across the UK. Expert logistics consultation for businesses of all sizes."
        canonical="https://Logisticenterprise.co.uk"
        isHomePage={true}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-emerald-700 text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Nationwide Logistics Network Active</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
              >
                Fast. Reliable. <br />
                <span className="text-emerald-600">Tailored Logistics</span> <br />
                nationwide.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-600 max-w-xl leading-relaxed"
              >
                Zarrar Logistic is your premier courier and freight consultation partner. 
                Delivering more than parcels delivering confidence nationwide.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/quote" 
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/20 group"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/services" 
                  className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-slate-50 transition-all"
                >
                  Explore Services
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200"
              >
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={PicHome} 
                  alt="Truck under load - Zarrar Logistic" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500 p-3 rounded-xl">
                      <Shield className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Secure Transport</div>
                      <div className="text-white/80 text-sm">Fully insured & trackable shipments</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3"
              >
                <div className="bg-blue-100 p-2 rounded-lg"><Truck className="text-blue-600 w-5 h-5" /></div>
                <div className="text-sm font-bold text-slate-800">Live Tracking</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Core Logistics Services" 
            subtitle="Tailored delivery solutions designed for efficiency and reliability."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", service.color)}>
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                <Link to="/services" className="text-emerald-600 font-bold flex items-center space-x-2 group/link">
                  <span>Learn More</span>
                  <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Search */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading 
            title="Find Your Local Branch" 
            subtitle="With a nationwide network, we're always close to your collection point."
            centered
          />
          <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-grow">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Enter your postcode" 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              />
            </div>
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-500 transition-all flex items-center justify-center space-x-2">
              <Search size={20} />
              <span>Search Branch</span>
            </button>
          </div>
          <p className="mt-6 text-slate-400 text-sm">
            Example: SW1A 1AA, M1 1AA, EH1 1AA
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img 
                  src={PicHome2} 
                  alt="Reliable Delivery" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-emerald-600 p-10 rounded-3xl text-white hidden md:block">
                <div className="text-4xl font-bold mb-1">15+</div>
                <div className="text-sm font-medium opacity-80 uppercase tracking-widest">Years Experience</div>
              </div>
            </div>
            
            <div className="space-y-8">
              <SectionHeading 
                title="Why Choose Zarrar Logistic?" 
                subtitle="We don't offer generic delivery services. We analyse your needs first — then deliver smarter, faster solutions."
              />
              
              <div className="space-y-6">
                {[
                  "Nationwide Coverage & Local Branch Expertise",
                  "Tailored Logistics Solutions for Every Business",
                  "Transparent Pricing with No Hidden Costs",
                  "Fast Response & Professional Consultation",
                  "Fully Trackable & Insured Shipments"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-emerald-100 p-1 rounded-full mt-1">
                      <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-6">
                <Link to="/about" className="inline-flex items-center space-x-2 text-slate-900 font-bold border-b-2 border-emerald-600 pb-1 hover:text-emerald-600 transition-colors">
                  <span>Read Our Story</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Ready to Streamline Your Logistics?
          </h2>
          <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">
            Contact our expert team today for a customized quote and consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote" className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl shadow-emerald-900/20">
              Get a Quote
            </Link>
            <a href="tel:+44 7466 452195" className="bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition-all flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
