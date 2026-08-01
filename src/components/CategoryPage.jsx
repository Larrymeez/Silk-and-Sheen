// src/components/CategoryPage.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import Footer from "./Footer";

const OFFSETS = [0, 22, 8, 30, 12];

function CategoryPage({ category }) {
  const navigate = useNavigate();
  const categoryProducts = products.filter((p) => p.category === category.slug);

  return (
    <main className="min-h-screen bg-brandbg text-white">

      {/* CINEMATIC HERO */}
      <section className="relative w-full h-[65vh] sm:h-[72vh] lg:h-[80vh] overflow-hidden">
        <motion.img
          src={category.image}
          alt={category.label}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="absolute bottom-24 sm:bottom-28 left-6 sm:left-10 lg:left-16 font-calligraphy italic text-4xl sm:text-6xl lg:text-7xl text-white"
          style={{ textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
        >
          {category.label}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="
            absolute -bottom-1 left-6 sm:left-10 lg:left-16
            translate-y-1/2
            bg-brandbg/95 backdrop-blur-sm
            border border-gold/40
            px-6 py-5 sm:px-8 sm:py-6
            w-[calc(100%-3rem)] sm:w-auto sm:min-w-[320px]
          "
        >
          <div className="flex items-center justify-between gap-8 sm:gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1">Texture</p>
              <p className="text-sm sm:text-base text-white font-medium">{category.label}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1">Material</p>
              <p className="text-sm sm:text-base text-white font-medium">
                {category.material || "100% Human Hair"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1">In Stock</p>
              <p className="text-sm sm:text-base text-gold font-medium">
                {categoryProducts.length || "—"}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INTRO ROW */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="font-calligraphy italic text-2xl sm:text-3xl lg:text-4xl text-gold leading-snug"
          >
            {category.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-400 text-base sm:text-lg leading-relaxed self-end"
          >
            {category.description}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-16 sm:mb-20" />
      </div>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24 sm:pb-28">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-10 sm:gap-y-14">
            {categoryProducts.map((product, index) => {
              const offset = OFFSETS[index % OFFSETS.length];
              return (
                <motion.article
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  initial={{ opacity: 0, y: offset + 24 }}
                  whileInView={{ opacity: 1, y: offset }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
                  className="group cursor-pointer"
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
                        KSh {product.pricing?.[product.startingLength]?.toLocaleString()}
                      </p>
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-t border-b border-white/10 py-20 text-center"
          >
            <p className="font-calligraphy italic text-2xl sm:text-3xl text-gold mb-3">
              This edit is being restocked
            </p>
            <p className="text-gray-400 max-w-sm mx-auto text-sm sm:text-base">
              New {category.label.toLowerCase()} pieces are on their way. Check back soon,
              or reach out and we'll notify you the moment they land.
            </p>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default CategoryPage;