// src/components/QuickShopCarousel.jsx
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { products } from "../data/products";

function QuickShopCarousel() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 260;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + 20) : cardWidth + 20,
      behavior: "smooth",
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full bg-brandbg py-14 sm:py-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.25em] mb-2">
              Quick Shop
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Shop instantly
            </h2>
          </div>

          {/* Desktop arrow controls */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scrollByAmount("left")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white hover:border-gold hover:text-gold transition"
              aria-label="Scroll left"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white hover:border-gold hover:text-gold transition"
              aria-label="Scroll right"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="
            flex gap-4 sm:gap-5
            overflow-x-auto
            snap-x snap-mandatory
            scroll-smooth
            pb-4
            -mx-4 px-4 sm:mx-0 sm:px-0
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
        >
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="
                snap-start
                shrink-0
                w-[45vw] sm:w-56 md:w-60
                cursor-pointer
                rounded-xl
                overflow-hidden
                bg-white
                text-black
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-3 py-3 sm:px-4 sm:py-4">
                <h3 className="font-medium text-xs sm:text-sm truncate">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  KSh {product.basePrice?.toLocaleString()}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default QuickShopCarousel;