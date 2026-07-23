import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiShoppingBag, FiTruck, FiCheck } from "react-icons/fi";
import { CartContext } from "../context/CartContext.jsx";
import { products } from "../data/products";

function ProductPage() {
const { id } = useParams();
const navigate = useNavigate();

const { addToCart } = useContext(CartContext);

const product = products.find(
(p) => p.id === Number(id)
);

const [inches, setInches] = useState(
product?.startingLength || 14
);

const [quantity, setQuantity] = useState(1);

// If the product does not exist
if (!product) {
  return (
    <div className="min-h-screen bg-brandbg text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>

      <p className="text-gray-400 mb-8">
        The product you are looking for may no longer be available.
      </p>

      <button
        onClick={() => navigate("/clip-ins")}
        className="bg-gold text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
      >
        Back to Clip-Ins
      </button>
    </div>
  );

}

// Calculate price based on selected length
const price =
product.basePrice +
(inches - product.startingLength) *
product.pricePerExtraInch;

const totalPrice = price * quantity;

const increaseQuantity = () => {
setQuantity((prev) => prev + 1);
};

const decreaseQuantity = () => {
setQuantity((prev) => Math.max(1, prev - 1));
};

const handleAddToCart = () => {
addToCart(product, inches, quantity);
};

const handleBuyNow = () => {
addToCart(product, inches, quantity);
navigate("/cart");
};

return (
<motion.main
className="min-h-screen bg-brandbg text-white px-4 sm:px-6 md:px-10 lg:px-20 py-28"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.7 }}
> <div className="max-w-7xl mx-auto">

  {/* Breadcrumb */}
    <motion.div
      className="mb-8 text-sm text-gray-400"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button
        onClick={() => navigate("/clip-ins")}
        className="hover:text-gold transition"
      >
        Clip-Ins
      </button>

      <span className="mx-2">/</span>

      <span className="text-gray-300">
        {product.name}
      </span>
    </motion.div>

    {/* Main Product Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

      {/* PRODUCT IMAGE */}
      <motion.div
        className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl group"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>

      {/* PRODUCT INFORMATION */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >

        {/* Product Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-4">
          {product.name}
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-1">
            Starting from
          </p>

          <p className="text-3xl font-semibold text-gold">
            KES {price.toLocaleString()}
          </p>
        </div>

        {/* Length Selection */}
        <div className="mb-8">

          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold">
              Length
            </label>

            <span className="text-gold font-semibold">
              {inches}"
            </span>
          </div>

          {/* Quick Length Options */}
          <div className="flex flex-wrap gap-3 mb-5">
            {[14, 16, 18, 20, 22, 24].map((length) => (
              <button
                key={length}
                onClick={() => {
                  if (length >= product.startingLength) {
                    setInches(length);
                  }
                }}
                disabled={length < product.startingLength}
                className={`px-4 py-2 rounded-md border transition ${
                  inches === length
                    ? "bg-gold text-black border-gold"
                    : length < product.startingLength
                    ? "border-gray-700 text-gray-600 cursor-not-allowed"
                    : "border-gray-600 text-gray-300 hover:border-gold hover:text-gold"
                }`}
              >
                {length}"
              </button>
            ))}
          </div>

          {/* Length Slider */}
          <input
            type="range"
            min={product.startingLength}
            max={30}
            value={inches}
            onChange={(e) =>
              setInches(Number(e.target.value))
            }
            className="w-full accent-gold cursor-pointer"
          />

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>
              {product.startingLength}"
            </span>

            <span>
              30"
            </span>
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-8">

          <label className="block font-semibold mb-3">
            Quantity
          </label>

          <div className="flex items-center w-fit border border-gray-600 rounded-md overflow-hidden">

            <button
              onClick={decreaseQuantity}
              className="px-4 py-3 hover:bg-gray-800 transition"
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>

            <span className="px-6 py-3 border-x border-gray-600 min-w-[60px] text-center">
              {quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="px-4 py-3 hover:bg-gray-800 transition"
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>

          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="border-t border-gray-700 pt-6 mb-8">

          <div className="flex justify-between text-gray-400 mb-3">
            <span>
              {inches}" length
            </span>

            <span>
              KES {price.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-gray-400 mb-4">
            <span>
              Quantity
            </span>

            <span>
              × {quantity}
            </span>
          </div>

          <div className="flex justify-between items-center text-xl font-semibold">
            <span>
              Total
            </span>

            <span className="text-gold">
              KES {totalPrice.toLocaleString()}
            </span>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">

          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-3 bg-gold text-black px-6 py-4 rounded-md font-semibold hover:bg-yellow-600 transition transform hover:scale-[1.02]"
          >
            <FiShoppingBag />
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 border border-gold text-gold px-6 py-4 rounded-md font-semibold hover:bg-gold hover:text-black transition"
          >
            Buy Now
          </button>

        </div>

        {/* PRODUCT HIGHLIGHTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-700 pt-6">

          <div className="flex items-center gap-3">
            <FiCheck className="text-gold text-xl flex-shrink-0" />

            <span className="text-sm text-gray-300">
              Premium quality hair
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FiTruck className="text-gold text-xl flex-shrink-0" />

            <span className="text-sm text-gray-300">
              Fast delivery
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FiShoppingBag className="text-gold text-xl flex-shrink-0" />

            <span className="text-sm text-gray-300">
              Easy shopping
            </span>
          </div>

        </div>

      </motion.div>

    </div>

  </div>
</motion.main>

);
}

export default ProductPage;
