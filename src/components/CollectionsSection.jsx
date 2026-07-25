// src/components/CollectionsSection.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import bundles1 from "../assets/bundles1.jpg";
import frontal1 from "../assets/frontal1.jpg";
import glueless1 from "../assets/glueless1.jpg";
import part3 from "../assets/part3.jpg";
import clipins3 from "../assets/clipins3.jpg";
import braiding1 from "../assets/braiding1.jpg";

const categories = [
  { name: "Bundles", image: bundles1, path: "/bundles" },
  { name: "Frontals & Closures", image: frontal1, path: "/frontals-closures" },
  { name: "Glueless Lace Wigs", image: glueless1, path: "/glueless-wigs" },
  { name: "Part Wigs", image: part3, path: "/part-wigs" },
  { name: "Clip-ins", image: clipins3, path: "/clip-ins" },
  { name: "Braiding Hair", image: braiding1, path: "/braiding-hair" },
];

function CollectionsSection() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section className="bg-brandbg text-white py-20 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14 sm:mb-16"
        >
          <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
            The Index
          </p>
          <h2 className="font-calligraphy italic text-4xl sm:text-5xl md:text-6xl text-white">
            Our Collections
          </h2>
        </motion.div>

        {/* INDEX + PREVIEW LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT: LIST */}
          <ul className="divide-y divide-white/10 border-t border-white/10 lg:border-t-0">
            {categories.map((category, index) => (
              <li key={category.name}>
                <Link
                  to={category.path}
                  onMouseEnter={() => setActive(category)}
                  onFocus={() => setActive(category)}
                  className="group flex items-center justify-between gap-6 py-6 sm:py-7"
                >
                  <div className="flex items-baseline gap-5 sm:gap-7 min-w-0">
                    <span className="text-xs text-gray-500 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight
                        text-gray-300 group-hover:text-white
                        transition-colors duration-300
                        truncate
                      "
                    >
                      {category.name}
                    </span>
                  </div>

                  {/* Right side: thumbnail on mobile, arrow on desktop */}
                  <div className="flex items-center gap-4 shrink-0">
                    <img
                      src={category.image}
                      alt=""
                      className="lg:hidden w-14 h-14 rounded-md object-cover"
                    />
                    <span
                      className="
                        hidden lg:inline text-lg text-gray-600
                        transition-all duration-300
                        group-hover:text-gold group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT: STICKY PREVIEW (desktop only) */}
          <div className="hidden lg:block lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.name}
                  src={active.image}
                  alt={active.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <p className="absolute bottom-6 left-6 font-calligraphy italic text-2xl text-gold">
                {active.name}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CollectionsSection;