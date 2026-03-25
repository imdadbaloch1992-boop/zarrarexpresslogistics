import React from 'react';
import { motion } from 'motion/react';
import { Truck, Package, Shield, Clock, Phone, ChevronDown, Mail, MapPin, Search, ChevronRight, Menu, X, Facebook, Twitter, Linkedin, Globe, CheckCircle2 } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

// --- Components ---

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/90 backdrop-blur-md py-3 border-slate-200 shadow-sm"
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-slate-900 p-1.5 rounded-lg group-hover:bg-emerald-600 transition-colors">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              ZARRAR <span className="text-emerald-600"> LOGISTIC </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-emerald-600",
                    isActive ? "text-emerald-600" : "text-slate-600"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Location Dropdown */}
           <div className="relative group">
  <button className="flex items-center text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
    Location
    <ChevronDown size={16} className="ml-1" />
  </button>

  <div className="absolute top-8 left-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
    <Link to="/london" className="block px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
      London
    </Link>

    <Link to="/manchester" className="block px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
      Manchester
    </Link>

    <Link to="/birmingham" className="block px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
      Birmingham
    </Link>
  </div>
</div>

            <Link
              to="/quote"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-900/10"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block px-3 py-4 text-base font-medium border-b border-slate-50",
                  isActive ? "text-emerald-600" : "text-slate-600"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Location */}
          {/* Mobile Location */}
<div className="border-b border-slate-50">
  <button
    onClick={() => setLocationOpen(!locationOpen)}
    className="w-full flex justify-between items-center px-3 py-4 text-base font-medium text-slate-600"
  >
    Location
    <ChevronDown size={16} />
  </button>

  {locationOpen && (
    <div className="pl-6 pb-2">
      <Link
        to="/london"
        className="block py-2 text-sm text-slate-600 hover:text-emerald-600"
        onClick={() => {
          setIsOpen(false);   // close mobile menu
          setLocationOpen(false); // close location dropdown
        }}
      >
        London
      </Link>
      <Link
        to="/manchester"
        className="block py-2 text-sm text-slate-600 hover:text-emerald-600"
        onClick={() => {
          setIsOpen(false);
          setLocationOpen(false);
        }}
      >
        Manchester
      </Link>
      <Link
        to="/birmingham"
        className="block py-2 text-sm text-slate-600 hover:text-emerald-600"
        onClick={() => {
          setIsOpen(false);
          setLocationOpen(false);
        }}
      >
        Birmingham
      </Link>
    </div>
  )}
</div>

          <div className="pt-4">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-slate-900 text-white px-5 py-4 rounded-xl font-semibold"
            >
              Get a Quote
            </Link>
          </div>

        </div>
      </motion.div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                ZARRAR <span className="text-emerald-500">LOGISTIC</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Fast. Reliable. Tailored Logistics Solutions nationwide. Delivering excellence nationwide since our inception.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Same-Day Courier</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Next-Day Delivery</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">UK Road Freight</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Specialist Logistics</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">White-Glove Delivery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link to="/industries" className="hover:text-emerald-500 transition-colors">Industries Served</Link></li>
              <li><Link to="/fleet" className="hover:text-emerald-500 transition-colors">Our Vehicle Fleet</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Get a Quote</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Find a Branch</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+44 (0) 20 XXXX XXXX</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>info@zarrarenterprise.co.uk</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="text-emerald-500 shrink-0" />
                <span>Mon – Sat: 08:00 – 20:00</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs">
            © {new Date().getFullYear()}  Zarrar Logistic. All rights reserved. Registered in England & Wales.
          </p>
          <div className="flex space-x-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={cn("mb-12", centered && "text-center")}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight"
    >
      {title}
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-600 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}

    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={cn("h-1 bg-emerald-600 mt-6 rounded-full", centered && "mx-auto")}
    />
  </div>
);

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);