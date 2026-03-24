import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Bundles", image: "/src/assets/bundles1.jpg", path: "/bundles" },
  { name: "Frontals & Closures", image: "/src/assets/frontal1.jpg", path: "/frontals-closures" },
  { name: "Glueless Lace Wigs", image: "/src/assets/glueless1.jpg", path: "/glueless-wigs" },
  { name: "Part Wigs", image: "/src/assets/part3.jpg", path: "/part-wigs" },
  { name: "Clip-ins", image: "/src/assets/clipins3.jpg", path: "/clip-ins" },
  { name: "Braiding Hair", image: "/src/assets/braiding1.jpg", path: "/braiding-hair" },
];

function CollectionsSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="py-20 bg-brandbg text-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16 px-4"
        variants={itemVariants}
      >
        <h2 className="text-4xl md:text-5xl font-calligraphy italic font-bold tracking-wide drop-shadow-lg">
          Our Collections
        </h2>
        <p className="text-gray-100 mt-3 text-lg md:text-xl font-calligraphy italic font-semibold drop-shadow-md">
          Browse by category and find your perfect look. Elegantly curated for quality and style.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat, index) => (
          <Link
            to={cat.path}
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              variants={itemVariants}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-25 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-10">
                <h3 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-lg z-20">
                  {cat.name}
                </h3>
                <button className="bg-gold text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition z-20">
                  View More
                </button>
              </div>

              {/* Bottom Label */}
              <div className="absolute bottom-4 left-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-lg z-20">
                {cat.name}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

export default CollectionsSection;