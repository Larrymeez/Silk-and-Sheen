import { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
  const { cartItems, totalAmount } = useContext(CartContext);

  const [installation, setInstallation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    notes: "",
  });

  const installationFee = 2500;

  const finalTotal = installation
    ? totalAmount + installationFee
    : totalAmount;

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer: formData,
      installation,
      cartItems,
      subtotal: totalAmount,
      installationFee: installation
        ? installationFee
        : 0,
      total: finalTotal,
    };

    console.log("ORDER DATA:", orderData);

    alert(
      "Thank you! Your order has been submitted successfully."
    );
  };

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

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-gold uppercase tracking-[0.25em] text-sm mb-3">
            Complete Your Order
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            Order Details
          </h1>

          <p className="text-gray-400 mt-4 max-w-xl">
            Tell us where to deliver your order and how
            we can help you complete your look.
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >

          {/* CUSTOMER DETAILS */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="bg-gray-900/45 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">

              <h2 className="text-2xl font-semibold mb-8">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* NAME */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <FiUser />
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <FiMail />
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <FiPhone />
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="07XX XXX XXX"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition"
                  />
                </div>

                {/* LOCATION */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <FiMapPin />
                    Delivery Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Where should we deliver?"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition"
                  />
                </div>

              </div>

              {/* NOTES */}
              <div className="mt-6">

                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <FiMessageSquare />
                  Additional Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any special requests or delivery instructions?"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition resize-none"
                />

              </div>

              {/* INSTALLATION */}
              <div className="mt-10">

                <h2 className="text-2xl font-semibold mb-5">
                  Wig Installation
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* NO INSTALLATION */}
                  <button
                    type="button"
                    onClick={() => setInstallation(false)}
                    className={`text-left p-5 rounded-xl border transition ${
                      !installation
                        ? "border-gold bg-gold/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">

                      <span className="font-semibold">
                        No Installation
                      </span>

                      {!installation && (
                        <FiCheck className="text-gold" />
                      )}

                    </div>

                    <p className="text-sm text-gray-400">
                      Order your hair and style it yourself.
                    </p>

                    <p className="text-gold mt-3 font-semibold">
                      Free
                    </p>

                  </button>

                  {/* INSTALLATION */}
                  <button
                    type="button"
                    onClick={() => setInstallation(true)}
                    className={`text-left p-5 rounded-xl border transition ${
                      installation
                        ? "border-gold bg-gold/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">

                      <span className="font-semibold">
                        Add Installation
                      </span>

                      {installation && (
                        <FiCheck className="text-gold" />
                      )}

                    </div>

                    <p className="text-sm text-gray-400">
                      Have your wig professionally installed.
                    </p>

                    <p className="text-gold mt-3 font-semibold">
                      + KES 2,500
                    </p>

                  </button>

                </div>

              </div>

            </div>

          </motion.div>

          {/* ORDER SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-fit bg-gray-900/45 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28"
          >

            <h2 className="text-2xl font-semibold mb-8">
              Order Summary
            </h2>

            {/* ITEMS */}
            <div className="flex flex-col gap-5 mb-8">

              {cartItems.map((item) => {

                const itemPrice = getItemPrice(item);

                return (
                  <div
                    key={`${item.id}-${item.inches}`}
                    className="flex items-center gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold text-sm">
                        {item.name}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {item.inches}" × {item.quantity}
                      </p>

                      <p className="text-gold text-sm mt-1">
                        KES{" "}
                        {formatPrice(
                          itemPrice *
                            item.quantity
                        )}
                      </p>

                    </div>

                  </div>
                );

              })}

            </div>

            <div className="border-t border-white/10 pt-5 space-y-4">

              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>
                  KES {formatPrice(totalAmount)}
                </span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Installation</span>
                <span>
                  {installation
                    ? `KES ${formatPrice(
                        installationFee
                      )}`
                    : "Free"}
                </span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between items-center">

                <span className="text-lg font-semibold">
                  Total
                </span>

                <span className="text-2xl font-bold text-gold">
                  KES {formatPrice(finalTotal)}
                </span>

              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-gold text-black py-3.5 rounded-lg font-semibold mt-8 hover:bg-yellow-600 transition"
            >
              Submit Order
            </button>

            <p className="text-gray-500 text-xs text-center mt-5 leading-relaxed">
              After submitting your order, we will review
              your details and send your invoice by email.
            </p>

          </motion.div>

        </form>

      </div>

    </motion.div>
  );
}

export default OrderPage;