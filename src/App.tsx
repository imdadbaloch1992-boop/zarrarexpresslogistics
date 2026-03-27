import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import React from 'react';

// Components
import { Navbar, Footer } from './components/Layout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Industries from './pages/Industries';
import Fleet from './pages/Fleet';
import QuoteForm from './pages/QuoteForm';
import QuoteConfirm from './pages/QuoteConfirm';
import BookingDetails from './pages/QuoteConfirm'; // ADDED THIS IMPORT
import PaymentPage from './pages/PaymentPage';
import LondonServices from './location/LondonServices';
import ManchesterServices from './location/ManchesterServices';
import BirminghamServices from './location/BirminghamServices';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/quote" element={<QuoteForm />} />
        <Route path="/confirm" element={<QuoteConfirm />} />
        <Route path="/booking-details" element={<BookingDetails />} /> 
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="/london" element={<LondonServices/>} />
        <Route path="/manchester" element={<ManchesterServices/>} />
        <Route path="/birmingham" element={<BirminghamServices/>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}