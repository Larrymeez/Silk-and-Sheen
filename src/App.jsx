import { useRef } from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bundles from "./pages/Bundles";
import FrontalsClosures from "./pages/FrontalsClosures";
import GluelessWigs from "./pages/GluelessWigs";
import PartWigs from "./pages/PartWigs";
import BraidingHair from "./pages/BraidingHair";
import ClipIns from "./pages/ClipIns";
import ProductPage from "./pages/ProductPage";
import CollectionsSection from "./components/CollectionsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import hero1 from "./assets/hero1.jpg";
import { CartProvider } from "./context/CartContext.jsx";
import SideDrawerCart from "./components/SideDrawerCart";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage";
import QuickShopCarousel from "./components/QuickShopCarousel";

function Home() {
  const quickShopRef = useRef(null);
  const collectionsRef = useRef(null);

  const scrollToQuickShop = () => {
    quickShopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="relative flex flex-col items-center overflow-hidden bg-brandbg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[680px] sm:min-h-[720px] lg:min-h-[780px] flex items-center overflow-hidden">

        {/* Background Image */}
        <motion.img
          src={hero1}
          alt="Silk & Sheen premium hair collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.02 }}
          animate={{ scale: 1.05 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Darkening + gradient */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

        {/* HERO CONTENT */}
        <motion.div
          className="
            relative z-10
            w-full
            max-w-7xl
            mx-auto
            px-6
            sm:px-10
            md:px-16
            lg:px-24
            py-16
            sm:py-20
          "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <div className="max-w-xl text-center md:text-left">

            
            {/* EYEBROW */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gold text-xs sm:text-sm uppercase tracking-[0.25em] mb-5"
            >
              Quality hair · Effortless style · Made for you
            </motion.p>

            {/* WORDMARK with one-time shimmer sweep */}
            <div className="relative overflow-hidden inline-block">
              <h1
                className="
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                  font-calligraphy italic text-white tracking-wide leading-tight
                "
                style={{ textShadow: "0 4px 14px rgba(0,0,0,0.7)" }}
              >
                Silk &amp; Sheen
              </h1>

              <motion.span
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.55) 45%, transparent 60%)",
                  mixBlendMode: "overlay",
                }}
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 1.4, delay: 1.1, ease: "easeInOut" }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              className="mt-4 text-xl sm:text-2xl md:text-3xl font-calligraphy italic text-gold"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.7)" }}
            >
              Confidence in every strand.
            </motion.p>

            {/* Description */}
            <motion.p
              className="mt-5 text-base sm:text-lg leading-relaxed text-gray-200 max-w-md"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
            >
              Premium hair, wigs and extensions for effortless beauty —
              however you wear your confidence.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-8 mt-9"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
            >
              <button
                onClick={scrollToQuickShop}
                className="
                  w-full sm:w-auto
                  bg-gold text-white
                  px-8 py-3.5
                  rounded-md
                  text-base sm:text-lg font-medium
                  transition duration-300
                  hover:bg-yellow-600 hover:-translate-y-0.5
                "
              >
                Shop Now
              </button>

              <button
                onClick={scrollToCollections}
                className="group relative w-full sm:w-auto text-white text-base sm:text-lg font-medium tracking-wide"
              >
                Explore Collections
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* QUICK SHOP */}
      <div ref={quickShopRef} className="w-full bg-brandbg">
        <QuickShopCarousel />
      </div>

      {/* COLLECTIONS */}
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
    <CartProvider>
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
          <Route path="/clip-ins/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        <SideDrawerCart />
      </Router>
    </CartProvider>
  );
}

export default App;