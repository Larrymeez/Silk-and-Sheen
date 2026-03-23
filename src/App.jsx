// App.jsx
import logo from "./assets/logo.png";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bundles from "./pages/Bundles";
import FrontalsClosures from "./pages/FrontalsClosures";
import GluelessWigs from "./pages/GluelessWigs";
import PartWigs from "./pages/PartWigs";
import BraidingHair from "./pages/BraidingHair";
import ClipIns from "./pages/ClipIns";
import CollectionsSection from "./components/CollectionsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import hero1 from "./assets/hero1.jpg";

function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative flex flex-col items-center overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[600px] flex flex-col md:flex-row items-start justify-between px-6 md:px-20 pt-32 pb-20 overflow-hidden">
        
        {/* Hero Background Image */}
        <motion.img
          src={hero1}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-black/10 -z-10 pointer-events-none"></div>

        {/* HERO CONTENT */}
        <motion.div
          className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.img
            src={logo}
            alt="Silk & Sheen Logo"
            className="w-32 md:w-40 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            SILK & SHEEN
          </motion.h1>

          <motion.p
            className="text-white text-lg max-w-md mb-8"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Premium wigs crafted for elegance, confidence and timeless beauty.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="bg-gold text-white px-8 py-3 rounded-md text-lg hover:bg-yellow-600 transition">
              Shop Collection
            </button>

            <button className="border border-white text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* BELOW HERO: DARK BACKGROUND SECTIONS */}
      <div className="w-full bg-brandbg">
        <CollectionsSection />
        <HowItWorksSection />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bundles" element={<Bundles />} />
        <Route path="/frontals-closures" element={<FrontalsClosures />} />
        <Route path="/glueless-wigs" element={<GluelessWigs />} />
        <Route path="/part-wigs" element={<PartWigs />} />
        <Route path="/clip-ins" element={<ClipIns />} />
        <Route path="/braiding-hair" element={<BraidingHair />} />
      </Routes>
    </Router>
  );
}

export default App;