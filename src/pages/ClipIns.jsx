import { useState } from "react";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Silky Straight Clip-ins", price: 4500, type: "Straight", length: "Long", image: "/src/assets/clipins1.jpg" },
  { id: 2, name: "Body Wave Clip-ins", price: 5000, type: "Wavy", length: "Medium", image: "/src/assets/clipins2.jpg" },
  { id: 3, name: "Curly Clip-ins", price: 5200, type: "Curly", length: "Long", image: "/src/assets/clipins3.jpg" },
  { id: 4, name: "Kinky Straight Clip-ins", price: 4800, type: "Straight", length: "Short", image: "/src/assets/clipins4.jpg" },
];

function ClipIns() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedLength, setSelectedLength] = useState("All");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((p) => {
    return (
      (selectedType === "All" || p.type === selectedType) &&
      (selectedLength === "All" || p.length === selectedLength) &&
      p.price <= maxPrice
    );
  });

  const totalPrice = selectedProduct
    ? selectedProduct.price * quantity
    : 0;

  // Animations
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="min-h-screen bg-brandbg text-white px-6 md:px-20 py-20">

      {/* 🔥 HERO HEADER (LEFT ALIGNED) */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-12 items-center mb-20"
      >
        {/* LEFT TEXT */}
        <div>
          <motion.h1
            variants={fadeLeft}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Silk & Sheen Clip-Ins
          </motion.h1>

          <motion.p
            variants={fadeLeft}
            className="text-2xl md:text-3xl font-calligraphy italic text-yellow-300 mb-6"
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}
          >
            Effortless elegance. Instant confidence.
          </motion.p>

          <motion.p
            variants={fadeLeft}
            className="text-gray-300 text-lg leading-relaxed mb-4"
          >
            Our 100% human hair clip-ins are crafted to give you seamless length, natural volume,
            and unmatched versatility in minutes — no salon needed. Whether sleek, wavy, or full-bodied curls,
            each set blends flawlessly and moves like your own.
          </motion.p>

          <motion.p
            variants={fadeLeft}
            className="text-lg font-semibold text-gray-200"
          >
            Clip in. Step out. Own every moment.
          </motion.p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          variants={fadeUp}
          className="hidden md:block relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
        >
          <motion.img
            src="/src/assets/hero3.jpg"
            alt="Clip-ins model"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Soft overlay for luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </motion.div>

      {/* FILTER BUTTON (MOBILE) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-6 md:hidden bg-gold px-4 py-2 rounded"
      >
        Filters
      </button>

      <div className="flex gap-10">

        {/* FILTER SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={`w-full md:w-1/4 bg-gray-900 p-6 rounded-xl ${showFilters ? "block" : "hidden md:block"}`}
        >
          <h3 className="text-xl font-semibold mb-4">Filter</h3>

          <div className="mb-6">
            <p className="mb-2">Type</p>
            {["All", "Straight", "Wavy", "Curly"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`block mb-2 ${selectedType === type ? "text-gold" : ""}`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <p className="mb-2">Length</p>
            {["All", "Short", "Medium", "Long"].map((len) => (
              <button
                key={len}
                onClick={() => setSelectedLength(len)}
                className={`block mb-2 ${selectedLength === len ? "text-gold" : ""}`}
              >
                {len}
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2">Max Price: KES {maxPrice}</p>
            <input
              type="range"
              min="3000"
              max="6000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full"
            />
          </div>
        </motion.div>

        {/* PRODUCTS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={product.image}
                className="w-full h-[250px] object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gold font-bold">KES {product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black p-6 rounded-xl w-[90%] max-w-md"
          >
            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>

            <p className="mt-2">KES {selectedProduct.price}</p>

            <div className="flex gap-4 my-4">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <p>Total: KES {totalPrice}</p>

            <div className="flex gap-4 mt-4">
              <button className="bg-gold text-white px-4 py-2 rounded">
                Add to Cart
              </button>
              <button onClick={() => setSelectedProduct(null)}>
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ClipIns;