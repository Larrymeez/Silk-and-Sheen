// src/components/CollectionsSection.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import bundles1 from "../assets/bundles1.jpg";
import frontal1 from "../assets/frontal1.jpg";
import glueless1 from "../assets/glueless1.jpg";
import part3 from "../assets/part3.jpg";
import clipins3 from "../assets/clipins3.jpg";
import braiding1 from "../assets/braiding1.jpg";

const categories = [
  {
    name: "Bundles",
    image: bundles1,
    path: "/bundles",
  },
  {
    name: "Frontals & Closures",
    image: frontal1,
    path: "/frontals-closures",
  },
  {
    name: "Glueless Lace Wigs",
    image: glueless1,
    path: "/glueless-wigs",
  },
  {
    name: "Part Wigs",
    image: part3,
    path: "/part-wigs",
  },
  {
    name: "Clip-ins",
    image: clipins3,
    path: "/clip-ins",
  },
  {
    name: "Braiding Hair",
    image: braiding1,
    path: "/braiding-hair",
  },
];

function CollectionsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <motion.section
      className="
        bg-brandbg
        text-white
        py-20
        sm:py-24
        lg:py-32
        px-5
        sm:px-8
        lg:px-12
      "
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.15,
      }}
    >

      {/* SECTION HEADER */}

      <motion.div
        variants={itemVariants}
        className="
          max-w-3xl
          mx-auto
          text-center
          mb-14
          sm:mb-16
        "
      >

        <h2
          className="
            font-calligraphy
            italic
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-bold
            tracking-wide
            text-white
          "
          style={{
            textShadow: "0 3px 12px rgba(0,0,0,0.45)",
          }}
        >
          Our Collections
        </h2>

        <p
          className="
            mt-5
            text-gray-300
            text-base
            sm:text-lg
            leading-relaxed
          "
        >
          Explore carefully curated collections designed to complement
          your style, your confidence, and every version of you.
        </p>

      </motion.div>


      {/* COLLECTION GRID */}

      <motion.div
        variants={containerVariants}
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          sm:gap-8
          lg:gap-10
        "
      >

        {categories.map((category) => (

          <motion.div
            key={category.name}
            variants={itemVariants}
          >

            <Link
              to={category.path}
              className="
                group
                block
                relative
                overflow-hidden
                rounded-xl
                bg-black
                shadow-lg
              "
            >

              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                "
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* SUBTLE DARK GRADIENT */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                    opacity-90
                  "
                />

                {/* HOVER LIGHT EFFECT */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-white/5
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

              </div>


              {/* CARD CONTENT */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  sm:p-6
                "
              >

                <div
                  className="
                    flex
                    items-end
                    justify-between
                    gap-4
                  "
                >

                  {/* CATEGORY NAME */}

                  <h3
                    className="
                      text-xl
                      sm:text-2xl
                      font-semibold
                      tracking-wide
                      text-white
                    "
                  >
                    {category.name}
                  </h3>


                  {/* ARROW */}

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-full
                      border
                      border-white/40
                      text-white
                      transition-all
                      duration-500
                      group-hover:bg-gold
                      group-hover:border-gold
                      group-hover:text-black
                      group-hover:rotate-45
                    "
                  >
                    <FiArrowUpRight size={19} />
                  </div>

                </div>


                {/* EXPLORE TEXT */}

                <div
                  className="
                    mt-3
                    text-sm
                    text-gray-300
                    transition-all
                    duration-500
                    group-hover:text-gold
                  "
                >
                  Explore Collection
                </div>

              </div>

            </Link>

          </motion.div>

        ))}

      </motion.div>

    </motion.section>
  );
}

export default CollectionsSection;