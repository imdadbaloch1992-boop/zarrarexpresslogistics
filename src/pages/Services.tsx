import React from 'react';
import { motion } from 'motion/react';
import { Truck, Package, Shield, Clock, CheckCircle2, ArrowRight, Zap, Globe, Users, Box, Anchor, Plane, Timer, Map, Lock, UserCheck, Briefcase, FileText, BarChart, HardHat, Sparkles, Gem, Layers } from 'lucide-react';
import { SectionHeading, PageTransition } from '../components/Layout';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';

const Services = () => {
  const courierServices = [
    { title: "Same-Day Courier UK & London", desc: "Urgent door-to-door delivery nationwide with dedicated vehicles.", icon: Timer },
    { title: "Pallet Delivery UK", desc: "Nationwide pallet delivery across the UK with next-working-day service.", icon: Clock },
    { title: "Full-Day & Half-Day Hire ", desc: "Dedicated driver and vehicle for your exclusive use.", icon: UserCheck },
    { title: "Time-Critical Deliveries", desc: "Precision logistics for when every minute counts.", icon: Zap },
    { title: "Local & Nationwide Coverage", desc: "From around the corner to across the country.", icon: Map },
    { title: "Secure & Trackable", desc: "Real-time updates and full insurance for peace of mind.", icon: Lock }
  ];

  const freightServices = [
    { title: "Driver Cover Services", desc: "Reliable backup for your own logistics operations.", icon: Briefcase },
    { title: "Import/Export Freight", desc: "Seamless movement of goods to and from the UK.", icon: Globe },
    { title: "Palletised Transport", desc: "Efficient handling of bulk goods and pallet networks.", icon: Layers },
    { title: "UK Road Freight", desc: "Comprehensive haulage solutions for all load sizes.", icon: Truck },
    { title: "Air Freight Coordination", desc: "Fast international transit for high-priority cargo.", icon: Plane },
    { title: "Customs-Ready Solutions", desc: "Expert navigation of post-Brexit freight regulations.", icon: FileText }
  ];

 const specialistServices = [
  { title: "ADR Transport", desc: "Certified handling of dangerous goods nationwide.", icon: HardHat },
  { title: "Two-Man Delivery", desc: "Specialist teams for heavy or bulky items.", icon: Users },
  { title: "White-Glove Delivery", desc: "Premium installation and assembly services.", icon: Sparkles },
  { title: "High-Value Goods", desc: "Enhanced security for luxury or sensitive items.", icon: Gem },
  { title: "Oversized & Fragile", desc: "Custom solutions for complex cargo requirements.", icon: Box },

  { 
    title: "UK Logistics Coverage", 
    desc: "Nationwide logistics coverage across England, Scotland, Wales, and Northern Ireland with reliable courier and freight solutions for businesses and individuals.", 
    icon: Globe 
  }
];

  return (
    <PageTransition>
      <SEO 
        title="Our Logistics Services"
        description="Explore our range of logistics services including same-day courier, next-day delivery, UK road freight, and specialist logistics solutions."
        canonical="https://Logisticsenterprise.co.uk/services"
      />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Logistics Services" 
            subtitle="Comprehensive courier and freight solutions tailored for your business."
            centered
          />

          {/* Courier Services */}
          <div className="mt-20">
            <div className="flex items-center space-x-4 mb-10">
              <div className="bg-emerald-600 p-3 rounded-2xl">
                <Zap className="text-white w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900"> UK Courier Services</h2>
                <p className="text-slate-600">Fast and flexible solutions for tight deadlines.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courierServices.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-emerald-100 transition-all group"
                >
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <service.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center space-x-2">
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Freight Services */}
          <div className="mt-24">
            <div className="flex items-center space-x-4 mb-10">
              <div className="bg-blue-600 p-3 rounded-2xl">
                <Truck className="text-white w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Logistics Services & International</h2>
                <p className="text-slate-600">Comprehensive haulage for businesses of all sizes.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freightServices.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <service.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center space-x-2">
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Specialist Services */}
          <div className="mt-24">
            <div className="flex items-center space-x-4 mb-10">
              <div className="bg-amber-600 p-3 rounded-2xl">
                <Shield className="text-white w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Logistics Services</h2>
                <p className="text-slate-600">Expert handling for complex and regulated freight.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialistServices.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-amber-100 transition-all group"
                >
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <service.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center space-x-2">
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;
