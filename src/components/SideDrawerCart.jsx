// src/components/SideDrawerCart.jsx

import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

export default function SideDrawerCart() {
  const {
    cartItems,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    totalAmount,
  } = useContext(CartContext);

  const navigate = useNavigate();

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

  // Navigate to the full cart page
  const goToCart = () => {
    setIsOpen(false);
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* CART DRAWER */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-brandbg text-white z-50 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.35,
              ease: "easeInOut",
            }}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">

              <div className="flex items-center gap-3">

                <FiShoppingBag className="text-gold text-xl" />

                <div>
                  <h2 className="text-xl font-semibold">
                    Your Cart
                  </h2>

                  <p className="text-sm text-gray-400">
                    {cartItems.length}{" "}
                    {cartItems.length === 1
                      ? "item"
                      : "items"}
                  </p>
                </div>

              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition text-2xl"
                aria-label="Close cart"
              >
                <FiX />
              </button>

            </div>

            {/* CART ITEMS */}
            <div className="flex-1 overflow-y-auto p-5">

              {cartItems.length === 0 ? (

                <div className="h-full flex flex-col items-center justify-center text-center">

                  <FiShoppingBag className="text-5xl text-gray-600 mb-5" />

                  <h3 className="text-lg font-semibold mb-2">
                    Your cart is empty
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Add something beautiful to your cart.
                  </p>

                </div>

              ) : (

                <div className="flex flex-col gap-5">

                  {cartItems.map((item) => {

                    const itemPrice = getItemPrice(item);

                    const itemTotal =
                      itemPrice * item.quantity;

                    return (

                      <motion.div
                        key={`${item.id}-${item.inches}`}
                        layout
                        className="flex gap-4 bg-gray-900/70 border border-gray-800 rounded-xl p-3"
                      >

                        {/* IMAGE */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                        />

                        {/* DETAILS */}
                        <div className="flex-1 min-w-0">

                          <div className="flex justify-between gap-2">

                            <h3 className="font-semibold text-sm truncate">
                              {item.name}
                            </h3>

                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.id,
                                  item.inches
                                )
                              }
                              className="text-gray-500 hover:text-red-400 transition"
                              aria-label={`Remove ${item.name}`}
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                          <p className="text-sm text-gray-400 mt-1">
                            Length: {item.inches}"
                          </p>

                          <p className="text-sm text-gold font-semibold mt-1">
                            KES {formatPrice(itemPrice)}
                          </p>

                          {/* QUANTITY CONTROLS */}
                          <div className="flex items-center justify-between mt-3">

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
                                className="px-2 py-1 hover:bg-gray-800 disabled:opacity-40 transition"
                              >
                                <FiMinus size={13} />
                              </button>

                              <span className="px-3 text-sm">
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
                                className="px-2 py-1 hover:bg-gray-800 transition"
                              >
                                <FiPlus size={13} />
                              </button>

                            </div>

                            <p className="text-sm font-semibold">
                              KES {formatPrice(itemTotal)}
                            </p>

                          </div>

                        </div>

                      </motion.div>

                    );

                  })}

                </div>

              )}

            </div>

            {/* FOOTER */}
            <div className="border-t border-gray-700 p-5">

              <div className="flex justify-between items-center mb-5">

                <span className="text-gray-400">
                  Total
                </span>

                <span className="text-xl font-semibold text-gold">
                  KES {formatPrice(totalAmount)}
                </span>

              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={goToCart}
                className="w-full bg-gold text-black py-3.5 rounded-md font-semibold hover:bg-yellow-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}