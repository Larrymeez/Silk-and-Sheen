// src/components/HowItWorksSection.jsx

// src/components/HowItWorksSection.jsx

import {
  FiShoppingBag,
  FiScissors,
  FiTruck,
  FiHeart,
} from "react-icons/fi";

import { motion } from "framer-motion";
import hero2 from "../assets/hero2.jpg";

const steps = [
  {
    icon: <FiShoppingBag />,
    title: "Choose Your Wig",
    description:
      "Browse our premium collections and find the style that feels like you.",
  },
  {
    icon: <FiScissors />,
    title: "Customize & Style",
    description:
      "Choose your preferred length, texture, color, and finish for your look.",
  },
  {
    icon: <FiTruck />,
    title: "Fast Delivery",
    description:
      "Your order is carefully prepared and delivered to your door.",
  },
  {
    icon: <FiHeart />,
    title: "Enjoy Your Look",
    description:
      "Step out feeling confident, beautiful, and completely yourself.",
  },
];

function HowItWorksSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
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
        relative
        overflow-hidden
        py-20
        sm:py-24
        lg:py-32
        px-5
        sm:px-8
        lg:px-12
        text-white
      "
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.15,
      }}
    >
      {/* BACKGROUND IMAGE */}

      <img
        src={hero2}
        alt="Silk & Sheen hair collection"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      />

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/65" />

      {/* SOFT GRADIENT */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/75" />

      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}

        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto text-center mb-14 sm:mb-16"
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
              textShadow: "0 3px 12px rgba(0,0,0,0.6)",
            }}
          >
            How It Works
          </h2>

          <p
            className="
              mt-5
              text-gray-200
              text-base
              sm:text-lg
              leading-relaxed
            "
          >
            From choosing your style to stepping out with confidence,
            getting your perfect look is simple.
          </p>
        </motion.div>

        {/* STEPS */}

        <motion.div
          variants={containerVariants}
          className="
            relative
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
            sm:gap-8
            lg:gap-6
          "
        >

          {/* CONNECTING LINE */}

          <div
            className="
              hidden
              lg:block
              absolute
              top-14
              left-[12%]
              right-[12%]
              h-px
              bg-white/25
              pointer-events-none
            "
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="
                group
                relative
                z-10
                flex
                flex-col
                items-center
                text-center
                p-7
                sm:p-8
                rounded-2xl
                bg-black/35
                border
                border-white/10
                backdrop-blur-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:bg-black/50
                hover:border-gold/40
              "
            >

              {/* STEP NUMBER */}

              <span
                className="
                  absolute
                  top-4
                  right-5
                  text-xs
                  tracking-widest
                  text-white/40
                "
              >
                0{index + 1}
              </span>

              {/* ICON */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-20
                  h-20
                  rounded-full
                  border
                  border-gold/60
                  bg-black/30
                  text-gold
                  text-3xl
                  mb-6
                  transition-all
                  duration-500
                  group-hover:scale-105
                  group-hover:bg-gold
                  group-hover:text-black
                "
              >
                {step.icon}
              </div>

              {/* TITLE */}

              <h3
                className="
                  text-xl
                  sm:text-2xl
                  font-semibold
                  tracking-wide
                  text-white
                  mb-3
                "
              >
                {step.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  text-gray-300
                  text-sm
                  sm:text-base
                  leading-relaxed
                "
              >
                {step.description}
              </p>

            </motion.div>
          ))}

        </motion.div>
      </div>
    </motion.section>
  );
}

export default HowItWorksSection;