// src/pages/ProductPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiShoppingBag, FiTruck, FiCheck } from "react-icons/fi";
import { CartContext } from "../context/CartContext.jsx";
import { products } from "../data/products";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === Number(id));

  const categoryPath = `/${product?.category || ""}`;
  const categoryLabel =
    product?.category
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "Shop";

  const gallery = product?.images?.length > 0 ? product.images : [product?.image];
  const availableLengths = Object.keys(product?.pricing || {})
    .map(Number)
    .sort((a, b) => a - b);

  const [activeImage, setActiveImage] = useState(0);
  const scrollRef = useRef(null);

  const [inches, setInches] = useState(product?.startingLength || availableLengths[0] || 18);
  const [quantity, setQuantity] = useState(1);

  const goToImage = (index) => {
    setActiveImage(index);
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const handleGalleryScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveImage(index);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-brandbg text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-400 mb-8">
          The product you are looking for may no longer be available.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gold text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const price = product.pricing?.[inches] ?? 0;
  const totalPrice = price * quantity;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => addToCart(product, inches, quantity);
  const handleBuyNow = () => {
    addToCart(product, inches, quantity);
    navigate("/cart");
  };

  return (
    <motion.main
      className="min-h-screen bg-brandbg text-white px-4 sm:px-6 md:px-10 lg:px-16 py-24 sm:py-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <motion.div
          className="mb-6 sm:mb-8 text-xs sm:text-sm text-gray-400"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button onClick={() => navigate(categoryPath)} className="hover:text-gold transition">
            {categoryLabel}
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">

          {/* GALLERY — framed print treatment */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>

            <div className="flex gap-4 sm:gap-5">

              {/* Vertical thumbnail rail — desktop only */}
              {gallery.length > 1 && (
                <div className="hidden sm:flex flex-col gap-3 shrink-0">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => goToImage(i)}
                      className={`
                        w-14 h-14 lg:w-16 lg:h-16 overflow-hidden
                        transition-all duration-300
                        ${i === activeImage ? "opacity-100 ring-1 ring-gold" : "opacity-40 hover:opacity-70"}
                      `}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main framed image */}
              <div className="flex-1 min-w-0">
                <div className="relative bg-gray-950 p-2.5 sm:p-3 border border-white/10 mx-auto max-w-[440px]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    <div
                      ref={scrollRef}
                      onScroll={handleGalleryScroll}
                      className="
                        flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                      "
                    >
                      {gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${product.name} — view ${i + 1}`}
                          className="w-full h-full flex-shrink-0 snap-center object-cover"
                        />
                      ))}
                    </div>

                    {/* Image counter — a real sequence (front/back/side), so numbering earns its place */}
                    {gallery.length > 1 && (
                      <div className="absolute bottom-3 right-3 text-[11px] tracking-[0.15em] text-gold bg-black/50 backdrop-blur-sm px-2.5 py-1">
                        {String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails — mobile only, horizontal below */}
            {gallery.length > 1 && (
              <div className="flex sm:hidden gap-3 mt-4 justify-center">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    className={`
                      w-14 h-14 shrink-0 overflow-hidden
                      transition-all duration-300
                      ${i === activeImage ? "opacity-100 ring-1 ring-gold" : "opacity-50 hover:opacity-80"}
                    `}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* INFO */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              {product.name}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              {product.description}
            </p>

            {/* SPEC TAG — same language as the category page swatch */}
            <div className="border border-gold/40 bg-white/[0.02] px-5 py-4 sm:px-6 sm:py-5 mb-8 flex items-center justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1">Texture</p>
                <p className="text-sm text-white font-medium">{product.type || categoryLabel}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1">Length</p>
                <p className="text-sm text-white font-medium">{inches}"</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1">Price</p>
                <p className="text-sm text-gold font-medium">KES {price.toLocaleString()}</p>
              </div>
            </div>

            {/* Length Selection — discrete lengths only, no in-between slider */}
            <div className="mb-8">
              <label className="font-medium text-sm sm:text-base block mb-3">Length</label>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {availableLengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => setInches(length)}
                    className={`px-4 py-2 text-sm border transition ${
                      inches === length
                        ? "bg-gold text-black border-gold"
                        : "border-gray-700 text-gray-300 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {length}"
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-medium mb-3 text-sm sm:text-base">Quantity</label>
              <div className="flex items-center w-fit border border-gray-700">
                <button onClick={decreaseQuantity} className="px-4 py-2.5 hover:bg-white/5 transition" aria-label="Decrease quantity">
                  <FiMinus />
                </button>
                <span className="px-5 py-2.5 border-x border-gray-700 min-w-[50px] text-center">
                  {quantity}
                </span>
                <button onClick={increaseQuantity} className="px-4 py-2.5 hover:bg-white/5 transition" aria-label="Increase quantity">
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="flex justify-between items-center text-lg sm:text-xl font-semibold">
                <span>Total</span>
                <span className="text-gold">KES {totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {inches}" length &times; {quantity}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-gold text-black px-6 py-3.5 sm:py-4 rounded-md font-semibold hover:bg-yellow-600 transition"
              >
                <FiShoppingBag />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 border border-gold text-gold px-6 py-3.5 sm:py-4 rounded-md font-semibold hover:bg-gold hover:text-black transition"
              >
                Buy Now
              </button>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <FiCheck className="text-gold shrink-0" />
                <span className="text-sm text-gray-400">Premium quality hair</span>
              </div>
              <div className="flex items-center gap-3">
                <FiTruck className="text-gold shrink-0" />
                <span className="text-sm text-gray-400">Fast delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <FiShoppingBag className="text-gold shrink-0" />
                <span className="text-sm text-gray-400">Easy shopping</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}

export default ProductPage;