// src/pages/ClipIns.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import hero3 from "../assets/hero3.jpg";
import { products } from "../data/products";


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
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-gray-900/60 backdrop-blur-sm hover:shadow-2xl transition flex flex-col"
              onClick={() => navigate(`/clip-ins/${product.id}`)}
            >
              {/* Image */}
              <motion.div className="w-full aspect-[4/5] overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Name & Select Button Below */}
              <div className="px-4 py-4 flex flex-col gap-2 items-center">
                <h3 className="text-lg font-semibold text-yellow-400 text-center">{product.name}</h3>
                <button
                  className="bg-gold text-black px-6 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Select
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ClipIns;