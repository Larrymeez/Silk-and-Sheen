// src/components/HowItWorksSection.jsx
import { FaShoppingBag, FaMagic, FaShippingFast, FaSmile } from "react-icons/fa";

const steps = [
  {
    icon: <FaShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />,
    title: "Choose Your Wig",
    description: "Browse our premium collections and pick the perfect style for you.",
  },
  {
    icon: <FaMagic className="w-10 h-10 md:w-12 md:h-12 text-pink-500" />,
    title: "Customize & Style",
    description: "Select your length, color, and lace type for a perfect fit.",
  },
  {
    icon: <FaShippingFast className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />,
    title: "Fast Delivery",
    description: "Your order is carefully packaged and shipped quickly to your door.",
  },
  {
    icon: <FaSmile className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />,
    title: "Enjoy Your Look",
    description: "Feel confident, elegant, and beautiful with your new Silk & Sheen wig.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-24 px-6 md:px-20 bg-brandbg text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-wide">
          How It Works
        </h2>
        <p className="text-gray-300 mt-3 max-w-xl mx-auto">
          A simple 4-step process to get the perfect wig delivered to you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-500 shadow-lg"
          >
            <div className="mb-6">
              {step.icon}
            </div>

            <h3 className="text-xl md:text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              {step.title}
            </h3>

            <p className="text-gray-300">
              {step.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default HowItWorksSection;