// src/pages/ClipIns.jsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import hero3 from "../assets/hero3.jpg";
import { products } from "../data/products";

function ClipIns() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeLeftVariants = {
    hidden: {
      opacity: 0,
      x: -40,
    },

    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <motion.main
      className="
        min-h-screen
        bg-brandbg
        text-white
        pt-28
        pb-20
        px-5
        sm:px-8
        lg:px-12
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >

      {/* MAIN CONTENT */}

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[0.8fr_1.8fr]
          gap-12
          lg:gap-16
          items-start
        "
      >

        {/* LEFT SIDE — INTRODUCTION */}

        <motion.section
          variants={fadeLeftVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            lg:sticky
            lg:top-32
            self-start
          "
        >

          {/* SMALL LABEL */}

          <p
            className="
              text-gold
              text-xs
              sm:text-sm
              uppercase
              tracking-[0.25em]
              mb-5
            "
          >
            The Clip-In Collection
          </p>


          {/* HEADING */}

          <h1
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-semibold
              leading-tight
              tracking-tight
            "
          >
            Silk & Sheen
            <span className="block text-gold">
              Clip-Ins
            </span>
          </h1>


          {/* TAGLINE */}

          <p
            className="
              mt-6
              font-calligraphy
              italic
              text-2xl
              sm:text-3xl
              text-white
              leading-relaxed
            "
          >
            Effortless elegance.
            <br />
            Instant confidence.
          </p>


          {/* DESCRIPTION */}

          <p
            className="
              mt-7
              text-gray-300
              text-base
              sm:text-lg
              leading-relaxed
              max-w-xl
            "
          >
            Our 100% human hair clip-ins are crafted to give you seamless
            length, natural volume, and unmatched versatility in minutes —
            no salon needed. Whether sleek, wavy, or full-bodied curls,
            each set blends flawlessly and moves like your own.
          </p>


          {/* CLOSING LINE */}

          <p
            className="
              mt-8
              text-white
              font-medium
              tracking-wide
            "
          >
            Clip in.
            <span className="text-gold"> Step out.</span>
            <br />
            Own every moment.
          </p>

        </motion.section>


        {/* RIGHT SIDE */}

        <section className="flex flex-col gap-10">


          {/* HERO IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="
              relative
              h-[280px]
              sm:h-[380px]
              lg:h-[460px]
              rounded-2xl
              overflow-hidden
              shadow-2xl
            "
          >

            <motion.img
              src={hero3}
              alt="Silk & Sheen Clip-Ins"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
              animate={{
                scale: [1, 1.035, 1],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* IMAGE OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/60
                via-black/10
                to-transparent
              "
            />

          </motion.div>


          {/* PRODUCTS HEADER */}

          <motion.div
            variants={fadeLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-end
              sm:justify-between
              gap-3
            "
          >

            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                  mb-2
                "
              >
                Explore the collection
              </p>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-semibold
                "
              >
                Find your perfect fit
              </h2>

            </div>

            <p className="text-sm text-gray-400">
              {products.length} styles available
            </p>

          </motion.div>


          {/* PRODUCT GRID */}

          <motion.div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-5
              sm:gap-6
            "
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.1,
            }}
          >

            {products.map((product) => (

              <motion.article
                key={product.id}
                variants={cardVariants}
                onClick={() =>
                  navigate(`/clip-ins/${product.id}`)
                }
                className="
                  group
                  cursor-pointer
                  overflow-hidden
                  rounded-xl
                  bg-white
                  text-black
                  shadow-lg
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >

                {/* PRODUCT IMAGE */}

                <div
                  className="
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    bg-gray-100
                  "
                >

                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />

                  {/* QUICK VIEW LABEL */}

                  <div
                    className="
                      absolute
                      bottom-3
                      left-3
                      right-3
                      rounded-md
                      bg-black/70
                      px-3
                      py-2
                      text-center
                      text-xs
                      tracking-wide
                      text-white
                      opacity-0
                      translate-y-2
                      transition-all
                      duration-300
                      group-hover:opacity-100
                      group-hover:translate-y-0
                    "
                  >
                    View Product
                  </div>

                </div>


                {/* PRODUCT INFORMATION */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    px-4
                    py-4
                  "
                >

                  <div>

                    <h3
                      className="
                        font-medium
                        text-sm
                        sm:text-base
                      "
                    >
                      {product.name}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-gray-600
                      "
                    >
                      KSh {product.price?.toLocaleString()}
                    </p>

                  </div>


                  {/* SELECT BUTTON */}

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/clip-ins/${product.id}`);
                    }}
                    className="
                      shrink-0
                      rounded-full
                      border
                      border-black
                      px-4
                      py-2
                      text-xs
                      transition-all
                      duration-300
                      hover:bg-black
                      hover:text-white
                    "
                  >
                    Select
                  </button>

                </div>

              </motion.article>

            ))}

          </motion.div>

        </section>

      </div>

    </motion.main>
  );
}

export default ClipIns;