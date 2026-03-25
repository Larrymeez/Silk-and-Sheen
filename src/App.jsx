import { useRef, useEffect, useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "./assets/hero1.jpg";

function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const collectionsRef = useRef(null);

  const words = ["in Every strand", , "Confidence"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const fullText = "SILK & SHEEN ";

  const smoothEase = [0.25, 0.8, 0.25, 1];

  const sectionFade = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } },
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter
  useEffect(() => {
    const interval = setInterval(() => {
      setLetterIndex(prev => (prev + 1 > fullText.length ? 0 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Rotating tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="relative flex flex-col items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO */}
      <section className="relative w-full min-h-[600px] flex flex-col md:flex-row items-start justify-between px-6 md:px-20 pt-32 pb-20 overflow-hidden">

        {/* Background */}
        <motion.img
          src={hero1}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: `translateY(${offsetY * 0.25}px)` }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/20 to-black/70" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.8)_100%)]" />

        {/* CONTENT */}
        <motion.div
          className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left md:w-1/2"
          variants={sectionFade}
          initial="hidden"
          animate="show"
        >
          {/* ✅ SHARP + BIGGER LOGO */}
          <motion.img
            src={logo}
            alt="Logo"
            className="w-40 md:w-48 mb-6 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))",
            }}
          />

          {/* TYPEWRITER TITLE */}
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
          >
            {fullText.slice(0, letterIndex)}
            <span className="inline-block w-1 h-8 bg-white animate-blink ml-1"></span>
          </motion.h1>

          {/* ✅ SCROLL + ANIMATED CALLIGRAPHY TAGLINE */}
          <motion.div
            className="h-10 mb-6 flex items-center justify-center md:justify-start"
            style={{
              transform: `translateY(${offsetY * 0.1}px)`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={words[currentWordIndex]}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-2xl md:text-3xl font-calligraphy italic font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"
                style={{
                  textShadow: "0 4px 12px rgba(0,0,0,0.6)",
                }}
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            className="text-white text-lg max-w-md mb-8"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
          >
            Premium wigs crafted for elegance, confidence and timeless beauty.
          </motion.p>

          {/* BUTTONS */}
          <motion.div className="flex gap-4">
            <button
              onClick={scrollToCollections}
              className="bg-gold text-white px-8 py-3 rounded-md text-lg hover:bg-yellow-600 transition transform hover:scale-105"
            >
              Shop Collection
            </button>

            <button className="border border-white text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-black transition transform hover:scale-105">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* BELOW HERO */}
      <div ref={collectionsRef} className="w-full bg-brandbg">
        <CollectionsSection />
        <HowItWorksSection />
        <Footer />
      </div>
    </motion.div>
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