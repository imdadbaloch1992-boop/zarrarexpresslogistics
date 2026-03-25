import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Shield, Award, Globe, Building2, CheckCircle2 } from 'lucide-react';
import { SectionHeading, PageTransition } from '../components/Layout';
import SEO from '../components/SEO';
import AboutPic from "../images/AboutPic.jpg";
const About = () => {
  return (
    <PageTransition>
      <SEO 
        title="About Us"
        description="Learn about Zarrar Logistic, a premier logistics provider built on reliability, efficiency, and customer-focused service."
        canonical="https://Logisticenterprise.co.uk/about"
      />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="About Zarrar Logistic" 
            subtitle="Delivering excellence nationwide through reliability and innovation."
            centered
          />

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-slate lg:prose-lg">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Zarrar Logistic is logistics provider built on reliability, efficiency, and customer-focused service. 
                  With a strong branch network and experienced logistics professionals, we deliver scalable courier and freight 
                  solutions that adapt to your business not the other way around.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our mission is simple: to make logistics efficient, transparent, and stress-free. Whether you are a small business, 
                  a growing Zarrar, or an individual with time-critical delivery requirements, our team is ready to support you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Globe, title: "Nationwide Coverage", desc: "Full nationwide reach with local expertise." },
                  { icon: Target, title: "Tailored Solutions", desc: "Logistics designed for your specific needs." },
                  { icon: Shield, title: "Reliability First", desc: "Consistent performance you can depend on." },
                  { icon: Users, title: "Expert Team", desc: "Experienced professionals at every branch." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-lg shrink-0">
                      <item.icon className="text-emerald-600 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={AboutPic} 
                  alt=" Zarrar Logistic Team" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-600 p-3 rounded-xl">
                    <Award className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold">Certified Quality</div>
                    <div className="text-slate-500 text-sm">ISO 9001 Logistics Standards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Goal Section */}
          <div className="mt-32 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl -mr-48 -mb-48" />
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-4xl font-bold mb-8">Our Goal</h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Our goal is to deliver tailored logistics solutions for our clients that save time, 
                reduce operational costs, and keep your business moving without delays.
              </p>
              <p className="text-lg text-emerald-400 font-semibold italic">
                "We don’t offer generic delivery services. We analyse your needs first — then deliver smarter, faster solutions."
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
