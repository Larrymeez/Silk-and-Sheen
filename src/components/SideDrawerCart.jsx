// src/components/SideDrawerCart.jsx
import { useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";

export default function SideDrawerCart() {
  const { cartItems, isOpen, setIsOpen, removeFromCart, updateQuantity, totalAmount } =
    useContext(CartContext);

  return (
    <motion.div
      className="fixed top-0 right-0 h-full w-full md:w-96 bg-gray-900/95 text-white shadow-xl z-50 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white text-2xl font-bold hover:text-gray-300 transition"
        >
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={`${item.id}-${item.inches}`}
              className="flex gap-3 items-center bg-gray-800 p-3 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-md"
              />
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-300">{item.inches}" Length</p>
                <p className="text-sm text-gray-300">
                  KES {(item.basePrice + (item.inches - 14) * 300) * item.quantity}
                </p>

                {/* Quantity Controls */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.inches, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="bg-gray-700 px-2 rounded disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.inches, item.quantity + 1)
                    }
                    className="bg-gray-700 px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.inches)}
                    className="ml-auto text-red-400 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-lg font-semibold mb-4">Total: KES {totalAmount}</p>
        <button
          disabled={cartItems.length === 0}
          className="w-full bg-gold text-black py-3 rounded-md hover:bg-yellow-600 transition disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </motion.div>
  );
}