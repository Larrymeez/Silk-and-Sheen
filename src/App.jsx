import { useRef } from "react";
import logo from "./assets/logo.png";
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

function Home() {
  const collectionsRef = useRef(null);

  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className="relative flex flex-col items-center overflow-hidden bg-brandbg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[680px] sm:min-h-[720px] lg:min-h-[760px] flex items-center overflow-hidden">

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

        {/* Overall darkening */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Text-focused gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

        {/* Mobile-friendly bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

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
            lg:px-20
            pt-24
            pb-20
          "
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.8, 0.25, 1],
          }}
        >
          <div className="max-w-xl text-center md:text-left">

            {/* Logo */}
            <motion.img
              src={logo}
              alt="Silk & Sheen Logo"
              className="
                w-36
                sm:w-40
                md:w-48
                lg:w-52
                mx-auto
                md:mx-0
                mb-6
                object-contain
              "
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.65))",
              }}
            />

            {/* Brand Name */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-calligraphy
                italic
                text-white
                tracking-wide
                leading-tight
              "
              style={{
                textShadow: "0 4px 14px rgba(0,0,0,0.7)",
              }}
            >
              SILK & SHEEN
            </h1>

            {/* Tagline */}
            <motion.p
              className="
                mt-4
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-calligraphy
                italic
                text-white
              "
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
              style={{
                textShadow: "0 4px 12px rgba(0,0,0,0.7)",
              }}
            >
              Confidence in every strand.
            </motion.p>

            {/* Description */}
            <motion.p
              className="
                mt-6
                text-base
                sm:text-lg
                md:text-xl
                leading-relaxed
                text-gray-100
                max-w-lg
              "
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              Premium hair, wigs and extensions designed for effortless beauty
              — whether you're dressing up or simply feeling like yourself.
            </motion.p>

            {/* Trust Line */}
            <motion.p
              className="
                mt-5
                text-xs
                sm:text-sm
                uppercase
                tracking-[0.2em]
                text-gray-200
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.9,
              }}
            >
              Quality hair • Effortless style • Made for you
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                md:items-start
                gap-4
                mt-8
              "
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1,
              }}
            >
              <button
                onClick={scrollToCollections}
                className="
                  w-full
                  sm:w-auto
                  bg-gold
                  text-white
                  px-8
                  py-3.5
                  rounded-md
                  text-base
                  sm:text-lg
                  font-medium
                  transition
                  duration-300
                  hover:bg-yellow-600
                  hover:-translate-y-0.5
                "
              >
                Shop Collection
              </button>

              <button
                onClick={scrollToCollections}
                className="
                  w-full
                  sm:w-auto
                  border
                  border-white/80
                  text-white
                  px-8
                  py-3.5
                  rounded-md
                  text-base
                  sm:text-lg
                  font-medium
                  transition
                  duration-300
                  hover:bg-white
                  hover:text-black
                "
              >
                Explore Our Styles
              </button>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* COLLECTIONS */}
      <div
        ref={collectionsRef}
        className="w-full bg-brandbg"
      >
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

          <Route
            path="/frontals-closures"
            element={<FrontalsClosures />}
          />

          <Route
            path="/glueless-wigs"
            element={<GluelessWigs />}
          />

          <Route
            path="/part-wigs"
            element={<PartWigs />}
          />

          <Route
            path="/clip-ins"
            element={<ClipIns />}
          />

          <Route
            path="/braiding-hair"
            element={<BraidingHair />}
          />

          <Route
            path="/clip-ins/:id"
            element={<ProductPage />}
          />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>

        <SideDrawerCart />

      </Router>
    </CartProvider>
  );
}

export default App;
