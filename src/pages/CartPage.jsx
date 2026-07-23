// src/pages/CartPage.jsx

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalAmount,
  } = useContext(CartContext);

  const [installation, setInstallation] = useState(false);

  const INSTALLATION_PRICE = 2500;

  const finalTotal =
    totalAmount + (installation ? INSTALLATION_PRICE : 0);

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

  return (
    <motion.main
      className="min-h-screen bg-brandbg text-white px-4 sm:px-6 md:px-10 lg:px-20 py-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Your Cart
          </h1>

          <p className="text-gray-400">
            Review your selections before placing your order.
          </p>

        </div>

        {cartItems.length === 0 ? (

          /* EMPTY CART */
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center">

            <FiShoppingBag className="text-6xl text-gray-600 mb-6" />

            <h2 className="text-2xl font-semibold mb-3">
              Your cart is empty
            </h2>

            <p className="text-gray-400 mb-8">
              Explore our collections and find something beautiful.
            </p>

            <button
              onClick={() => navigate("/clip-ins")}
              className="bg-gold text-black px-8 py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          /* CART CONTENT */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT SIDE — PRODUCTS */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {cartItems.map((item) => {

                const itemPrice = getItemPrice(item);

                return (
                  <motion.div
                    key={`${item.id}-${item.inches}`}
                    layout
                    className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-5"
                  >

                    {/* PRODUCT IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-32 h-48 sm:h-40 object-cover rounded-xl"
                    />

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1 flex flex-col justify-between">

                      <div>

                        <div className="flex justify-between gap-4">

                          <h2 className="text-xl font-semibold">
                            {item.name}
                          </h2>

                          <button
                            onClick={() =>
                              removeFromCart(
                                item.id,
                                item.inches
                              )
                            }
                            className="text-gray-500 hover:text-red-400 transition"
                          >
                            <FiTrash2 />
                          </button>

                        </div>

                        <p className="text-gray-400 mt-2">
                          Length: {item.inches}"
                        </p>

                        <p className="text-gold font-semibold mt-2">
                          KES {formatPrice(itemPrice)}
                        </p>

                      </div>

                      {/* QUANTITY + TOTAL */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">

                        <div className="flex items-center border border-gray-700 rounded-md">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.inches,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="px-3 py-2 hover:bg-gray-800 disabled:opacity-40"
                          >
                            <FiMinus />
                          </button>

                          <span className="px-5">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.inches,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-2 hover:bg-gray-800"
                          >
                            <FiPlus />
                          </button>

                        </div>

                        <p className="text-lg font-semibold">
                          KES{" "}
                          {formatPrice(
                            itemPrice * item.quantity
                          )}
                        </p>

                      </div>

                    </div>

                  </motion.div>
                );
              })}

              {/* CONTINUE SHOPPING */}
              <button
                onClick={() => navigate("/clip-ins")}
                className="text-left text-gold hover:text-yellow-400 transition w-fit mt-2"
              >
                ← Continue Shopping
              </button>

            </div>

            {/* RIGHT SIDE — ORDER SUMMARY */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 h-fit lg:sticky lg:top-28">

              <h2 className="text-2xl font-semibold mb-6">
                Order Summary
              </h2>

              {/* SUBTOTAL */}
              <div className="flex justify-between text-gray-400 mb-4">
                <span>
                  Products
                </span>

                <span>
                  KES {formatPrice(totalAmount)}
                </span>
              </div>

              {/* INSTALLATION OPTION */}
              <div className="border-y border-gray-700 py-5 my-5">

                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={installation}
                    onChange={(e) =>
                      setInstallation(e.target.checked)
                    }
                    className="mt-1 w-5 h-5 accent-gold cursor-pointer"
                  />

                  <div>

                    <p className="font-semibold">
                      Professional Wig Installation
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Add professional wig installation to your order.
                    </p>

                    <p className="text-gold font-semibold mt-2">
                      + KES {formatPrice(INSTALLATION_PRICE)}
                    </p>

                  </div>

                </label>

              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center mb-6">

                <span className="text-xl font-semibold">
                  Total
                </span>

                <span className="text-2xl font-bold text-gold">
                  KES {formatPrice(finalTotal)}
                </span>

              </div>

              {/* NEXT BUTTON */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gold text-black py-4 rounded-md font-semibold hover:bg-yellow-600 transition"
              >
                Continue to Order Details
              </button>

            </div>

          </div>

        )}

      </div>
    </motion.main>
  );
}

export default CartPage;