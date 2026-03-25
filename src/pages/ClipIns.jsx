// src/pages/ClipIns.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import hero3 from "../assets/hero3.jpg";
import clip1 from "../assets/clipins1.jpg";
import clip2 from "../assets/clipins2.jpg";
import clip4 from "../assets/clipins4.jpg";
import clip5 from "../assets/clipins5.jpg";
import clip6 from "../assets/clipins6.jpg";

const products = [
  { id: 1, name: "Silky Straight Clip-ins", basePrice: 4500, type: "Straight", image: clip1 },
  { id: 2, name: "Body Wave Clip-ins", basePrice: 5000, type: "Wavy", image: clip2 },
  { id: 3, name: "Curly Clip-ins", basePrice: 5200, type: "Curly", image: clip4 },
  { id: 4, name: "Kinky Straight Clip-ins", basePrice: 4800, type: "Straight", image: clip5 },
  { id: 5, name: "Luxury Volume Clip-ins", basePrice: 5500, type: "Wavy", image: clip6 },
];

function ClipIns() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);

  // slow background zoom (hero image)
  useEffect(() => {
    let scale = 1;
    let direction = 1;
    const interval = setInterval(() => {
      scale += 0.0005 * direction;
      if (scale > 1.05 || scale < 1) direction *= -1;
      setZoom(scale);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const cardVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <motion.div
      className="relative flex flex-col md:flex-row items-start md:items-start px-6 md:px-20 py-16 bg-brandbg text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* LEFT SIDE: Hero Text */}
      <motion.div
        className="md:w-1/3 flex flex-col gap-10"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold italic tracking-wide text-yellow-400">
            Silk & Sheen Clip-Ins
          </h1>
          <p className="text-gray-300 font-calligraphy text-lg md:text-xl">
            Effortless elegance. Instant confidence.
            <br />
            Our 100% human hair clip-ins are crafted to give you seamless length, natural volume, and unmatched versatility in minutes — no salon needed. Whether sleek, wavy, or full-bodied curls, each set blends flawlessly and moves like your own.
            <br />
            Clip in. Step out. Own every moment.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Hero image + Products */}
      <motion.div className="md:w-2/3 mt-10 md:mt-0 flex flex-col gap-10">
        {/* Hero Image */}
        <motion.div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
          <motion.img
            src={hero3}
            alt="Clip-ins hero"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: zoom }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map(product => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="group relative cursor-pointer bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              onClick={() => navigate(`/clip-ins/${product.id}`)}
            >
              {/* Image */}
              <div className="w-full aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">{product.name}</h3>
                <p className="text-white mb-3">From KES {product.basePrice}</p>
                <button className="bg-gold text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition">
                  Select
                </button>
              </div>

              {/* Bottom Label */}
              <div className="absolute bottom-4 left-4 text-white font-semibold drop-shadow-lg">{product.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ClipIns;