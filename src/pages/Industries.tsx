import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Factory, Stethoscope, HardHat, Car, Laptop, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading, PageTransition } from '../components/Layout';
import SEO from '../components/SEO';

const Industries = () => {
  const industries = [
    { 
      icon: ShoppingBag, 
      name: "Retail & E-Commerce", 
      desc: "Fast delivery for the digital high street.",
      image: "https://wallpapercave.com/wp/wp7566265.jpg"
    },
    { 
      icon: Factory, 
      name: "Manufacturing", 
      desc: "Just-in-time logistics for production lines.",
      image: "https://media.istockphoto.com/id/1465056864/photo/large-production-line-with-industrial-robot-arms-at-modern-bright-factory-solar-panels-are.jpg?s=612x612&w=0&k=20&c=yqclk4Li5opfMfpaoPua734of0ZaDv39NDT6C3goDC4="
    },
    { 
      icon: Stethoscope, 
      name: "Healthcare & Pharma", 
      desc: "Temperature-controlled and urgent medical transport.",
      image: "https://www.cliniindia.com/wp-content/uploads/2024/03/clinical-trial-blog-image.jpg"
    },
    { 
      icon: HardHat, 
      name: "Construction", 
      desc: "Oversized and site-specific delivery solutions.",
      image: "https://c4.wallpaperflare.com/wallpaper/302/5/199/architecture-building-construction-design-wallpaper-preview.jpg"
    },
    { 
      icon: Car, 
      name: "Automotive", 
      desc: "Critical parts delivery for the motor industry.",
      image: "https://img.freepik.com/premium-photo/classic-sports-cars-displayed-outdoor-auto-show-sunset_922936-63444.jpg"
    },
    { 
      icon: Laptop, 
      name: "Technology", 
      desc: "Secure transport for high-value electronics.",
      image: "https://images.alphacoders.com/105/thumb-1920-1056771.jpg"
    },
    { 
      icon: Calendar, 
      name: "Events & Exhibitions", 
      desc: "Time-sensitive logistics for trade shows.",
      image: "https://media.istockphoto.com/id/887680492/photo/visitors-among-the-stands-of-companies.jpg?s=612x612&w=0&k=20&c=xUzFV0iH9HqAkvvRXtktsr4AGoap31t3xEi00h0u56Y="
    }
  ];

  return (
    <PageTransition>
      <SEO 
        title="Industries We Serve"
        description="Tailored logistics solutions for retail, manufacturing, healthcare, construction, automotive, technology, and events industries across the UK."
        canonical="https://Logisticsenterprise.co.uk/industries"
      />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Industries We Serve" 
            subtitle="Logistics solutions tailored for key industries. We understand the unique challenges of your sector."
            centered
          />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-slate-100 bg-white hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={industry.image} 
                    alt={industry.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <industry.icon size={24} />
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-slate-900">{industry.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{industry.desc}</p>
                  <Link 
                    to="/quote" 
                    className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors group/link"
                  >
                    <span>Get Industry Quote</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="https://cdn-res.keymedia.com/cdn-cgi/image/w=840,h=504,f=auto/https://cdn-res.keymedia.com/cms/images/us/018/0270_637837082020766618.jpg" 
                alt="Industrial Logistics" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-900">Expertise That Drives Results</h2>
              <p className="text-lg text-slate-600">
                At Zarrar Logistic, we don't just move boxes. We partner with businesses nationwide to optimize their supply chains. 
                Our team understands the regulatory requirements and time constraints specific to your industry.
              </p>
              <ul className="space-y-4">
                {[
                  "Dedicated industry specialists for every account",
                  "Compliance with sector-specific regulations",
                  "Scalable solutions for seasonal peaks",
                  "Real-time reporting and performance metrics"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Industries;
