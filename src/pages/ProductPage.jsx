import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext.jsx";
import { products } from "../data/products";

function ProductPage() {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  const [inches, setInches] = useState(14);
  const [quantity, setQuantity] = useState(1);
  const [offsetY, setOffsetY] = useState(0);
  const [zoom, setZoom] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let scale = 1;
    let direction = 1;

    const interval = setInterval(() => {
      scale += 0.0005 * direction;

      if (scale > 1.03 || scale < 1) {
        direction *= -1;
      }

      setZoom(scale);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const price =
    product.basePrice +
    (inches - product.startingLength) *
      product.pricePerExtraInch;

  return (
    <motion.div
      className="px-6 md:px-20 py-16 bg-brandbg text-white flex flex-col md:flex-row gap-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Product Image */}
      <motion.div
        className="md:w-1/2 relative rounded-2xl overflow-hidden shadow-xl"
        style={{
          transform: `translateY(${offsetY * 0.05}px)`,
        }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: zoom }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Product Details */}
      <motion.div
        className="md:w-1/2 flex flex-col gap-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-300">
          {product.description}
        </p>

        {/* Inches Slider */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Length (inches): {inches}"
          </label>

          <input
            type="range"
            min={product.startingLength}
            max={30}
            value={inches}
            onChange={(e) =>
              setInches(Number(e.target.value))
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold"
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Quantity:
          </label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-24 px-2 py-1 text-black rounded-md"
          />
        </div>

        {/* Total Price */}
        <p className="text-xl md:text-2xl font-semibold">
          Total: KES {price * quantity}
        </p>

        <button
          onClick={() =>
            addToCart(product, inches, quantity)
          }
          className="bg-gold text-black px-6 py-3 rounded-md hover:bg-yellow-600 transition w-max"
        >
          Add to Cart
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ProductPage;