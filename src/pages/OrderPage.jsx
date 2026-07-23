// src/pages/OrderPage.jsx

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
  FiCheck,
} from "react-icons/fi";
import { CartContext } from "../context/CartContext.jsx";

function OrderPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalAmount,
  } = useContext(CartContext);

  const [installationSelected, setInstallationSelected] =
    useState(false);

  const installationFee = 2500;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    notes: "",
  });

  const formatPrice = (price) => {
    return Number(price).toLocaleString();
  };

  const getItemPrice = (item) => {
    return (
      item.basePrice +
      (item.inches - item.startingLength) *
        item.pricePerExtraInch
    );
  };

  const finalTotal =
    totalAmount +
    (installationSelected ? installationFee : 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer: formData,
      items: cartItems,
      installation: installationSelected,
      installationFee: installationSelected
        ? installationFee
        : 0,
      subtotal: totalAmount,
      total: finalTotal,
    };

    console.log("ORDER DATA:", orderData);

    // Temporary next step
    navigate("/order-review", {
      state: orderData,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brandbg text-white flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-3xl font-semibold mb-4">
            Your cart is empty
          </h1>

          <Link
            to="/"
            className="inline-block bg-gold text-black px-6 py-3 rounded-md font-semibold"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-brandbg text-white px-5 sm:px-8 md:px-12 lg:px-20 pt-32 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >

      <div className="max-w-7xl mx-auto">

        {/* BACK LINK */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition mb-8"
        >
          <FiArrowLeft />
          Back to Cart
        </Link>

        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >

          <p className="text-gold uppercase tracking-[0.25em] text-sm mb-4">
            Almost there
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Complete Your Order
          </h1>

          <p className="text-gray-400 mt-4 max-w-xl text-lg">
            Tell us where to send your beautiful new look.
          </p>

        </motion.div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* CUSTOMER DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >

              <div className="bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10">

                <div className="flex items-center gap-3 mb-8">

                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <FiUser className="text-gold" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold">
                      Your Details
                    </h2>

                    <p className="text-gray-400 text-sm">
                      We'll use these details to contact you about your order.
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* FULL NAME */}
                  <div className="md:col-span-2">

                    <label className="block text-sm text-gray-300 mb-2">
                      Full Name
                    </label>

                    <div className="relative">

                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-gold transition"
                      />

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div>

                    <label className="block text-sm text-gray-300 mb-2">
                      Email Address
                    </label>

                    <div className="relative">

                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-gold transition"
                      />

                    </div>

                  </div>

                  {/* PHONE */}
                  <div>

                    <label className="block text-sm text-gray-300 mb-2">
                      Phone Number
                    </label>

                    <div className="relative">

                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+254 7XX XXX XXX"
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-gold transition"
                      />

                    </div>

                  </div>

                  {/* LOCATION */}
                  <div className="md:col-span-2">

                    <label className="block text-sm text-gray-300 mb-2">
                      Delivery Location
                    </label>

                    <div className="relative">

                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Town, estate, building or delivery area"
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-gold transition"
                      />

                    </div>

                  </div>

                  {/* NOTES */}
                  <div className="md:col-span-2">

                    <label className="block text-sm text-gray-300 mb-2">
                      Additional Notes
                      <span className="text-gray-500 ml-2">
                        Optional
                      </span>
                    </label>

                    <div className="relative">

                      <FiMessageSquare className="absolute left-4 top-4 text-gray-500" />

                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Any special instructions for your order?"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-gold transition resize-none"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* ORDER SUMMARY */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="h-fit lg:sticky lg:top-28"
            >

              <div className="bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">

                <h2 className="text-2xl font-semibold mb-7">
                  Your Order
                </h2>

                {/* PRODUCTS */}
                <div className="flex flex-col gap-5 mb-7">

                  {cartItems.map((item) => {

                    const itemPrice = getItemPrice(item);

                    return (
                      <div
                        key={`${item.id}-${item.inches}`}
                        className="flex gap-3"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">

                          <h3 className="text-sm font-semibold">
                            {item.name}
                          </h3>

                          <p className="text-xs text-gray-400 mt-1">
                            {item.inches}" × {item.quantity}
                          </p>

                          <p className="text-sm text-gold mt-1">
                            KES {formatPrice(itemPrice * item.quantity)}
                          </p>

                        </div>

                      </div>
                    );

                  })}

                </div>

                <div className="border-t border-white/10 pt-5">

                  <div className="flex justify-between text-gray-400 mb-4">
                    <span>Subtotal</span>
                    <span>KES {formatPrice(totalAmount)}</span>
                  </div>

                  {/* INSTALLATION */}
                  <button
                    type="button"
                    onClick={() =>
                      setInstallationSelected(!installationSelected)
                    }
                    className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border mb-5 text-left transition ${
                      installationSelected
                        ? "border-gold bg-gold/10"
                        : "border-white/10 bg-white/5 hover:border-gold/40"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          installationSelected
                            ? "bg-gold border-gold text-black"
                            : "border-gray-500"
                        }`}
                      >
                        {installationSelected && (
                          <FiCheck size={13} />
                        )}
                      </div>

                      <span className="text-sm">
                        Wig Installation
                      </span>

                    </div>

                    <span className="text-gold text-sm font-semibold">
                      + KES 2,500
                    </span>

                  </button>

                  {installationSelected && (
                    <div className="flex justify-between text-gray-400 mb-4">
                      <span>Installation</span>
                      <span>KES 2,500</span>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-5 flex justify-between items-center">

                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gold">
                      KES {formatPrice(finalTotal)}
                    </span>

                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-black py-3.5 rounded-xl font-semibold mt-8 hover:bg-yellow-600 transition"
                >
                  Review Order
                </button>

                <p className="text-gray-500 text-xs text-center mt-5">
                  Your information is used only to process your order.
                </p>

              </div>

            </motion.div>

          </div>

        </form>

      </div>

    </motion.div>
  );
}

export default OrderPage;