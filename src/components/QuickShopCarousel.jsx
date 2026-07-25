// src/components/QuickShopCarousel.jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";

// Uneven vertical rhythm — strands of varying "length"
const OFFSETS = [0, 26, 8, 34, 14, 4];

function QuickShopCarousel() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? (el.scrollLeft / max) * 100 : 0;
    setProgress(pct);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  };

  const nudge = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 240;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
      behavior: "smooth",
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full bg-brandbg pt-16 pb-24 sm:pt-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header row */}
        <div className="flex items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Quick Shop
            </h2>
            <p className="mt-2 font-calligraphy italic text-lg sm:text-xl text-gold">
              Every piece, one tap away.
            </p>
          </div>

          {/* Text-based prev/next, not icon buttons */}
          <div className="hidden sm:flex items-center gap-5 pb-1 shrink-0">
            <button
              onClick={() => nudge("left")}
              disabled={atStart}
              className={`group relative text-xs tracking-[0.2em] uppercase transition ${
                atStart ? "text-gray-600 cursor-default" : "text-gray-300 hover:text-white"
              }`}
            >
              Prev
              {!atStart && (
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              )}
            </button>

            <span className="text-gray-700">/</span>

            <button
              onClick={() => nudge("right")}
              disabled={atEnd}
              className={`group relative text-xs tracking-[0.2em] uppercase transition ${
                atEnd ? "text-gray-600 cursor-default" : "text-gray-300 hover:text-white"
              }`}
            >
              Next
              {!atEnd && (
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              )}
            </button>
          </div>
        </div>

        {/* Filament progress line — the thread being pulled through */}
        <div className="relative w-full h-px bg-white/15 mb-10 sm:mb-14">
          <span
            className="absolute left-0 top-0 h-px bg-gold transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            flex gap-6 sm:gap-8
            overflow-x-auto
            snap-x snap-mandatory
            scroll-smooth
            pb-6
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
        >
          {products.map((product, index) => {
            const offset = OFFSETS[index % OFFSETS.length];
            return (
              <motion.article
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                initial={{ opacity: 0, y: offset + 24 }}
                whileInView={{ opacity: 1, y: offset }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
                className="
                  group
                  snap-start
                  shrink-0
                  w-[52vw] sm:w-52 md:w-56
                  cursor-pointer
                "
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full h-full object-cover
                      grayscale-[35%] group-hover:grayscale-0
                      scale-100 group-hover:scale-[1.04]
                      transition-all duration-700 ease-out
                    "
                  />
                </div>

                <div className="mt-3 sm:mt-4">
                  <h3 className="text-xs sm:text-sm text-white font-medium tracking-wide truncate">
                    {product.name}
                  </h3>

                  <div className="relative inline-block mt-1">
                    <p className="text-xs sm:text-sm text-gray-400">
                      KSh {product.basePrice?.toLocaleString()}
                    </p>
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default QuickShopCarousel;