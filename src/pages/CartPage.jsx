import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { motion } from "framer-motion";
import {
FiMinus,
FiPlus,
FiTrash2,
FiShoppingBag,
FiArrowLeft,
FiCheck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function CartPage() {
const {
cartItems,
removeFromCart,
updateQuantity,
totalAmount,
} = useContext(CartContext);

const navigate = useNavigate();

const [installationSelected, setInstallationSelected] = useState(false);

const installationFee = 2500;

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

return (
<motion.div
className="relative min-h-screen bg-brandbg text-white overflow-hidden"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8 }}
>
{/* SUBTLE BACKGROUND LIGHTING */} <div className="fixed inset-0 pointer-events-none -z-10"> <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" /> <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" /> </div>

  {/* CONTENT */}
  <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20 pt-32 pb-20">

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition mb-6"
        >
          <FiArrowLeft />
          Continue Shopping
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
          Your Cart
        </h1>

        <p className="text-gray-400 mt-4 max-w-xl">
          Review your selected pieces before completing your order.
        </p>
      </motion.div>

      {cartItems.length === 0 ? (

        /* EMPTY CART */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto text-center bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-12 shadow-xl"
        >
          <FiShoppingBag className="text-6xl text-gold mx-auto mb-6" />

          <h2 className="text-2xl font-semibold mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-400 mb-8">
            Explore our collections and find something beautiful.
          </p>

          <Link
            to="/"
            className="inline-block bg-gold text-black px-8 py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
          >
            Explore Collections
          </Link>
        </motion.div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {cartItems.map((item, index) => {

              const itemPrice = getItemPrice(item);
              const itemTotal = itemPrice * item.quantity;

              return (
                <motion.div
                  key={`${item.id}-${item.inches}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-xl hover:border-gold/30 transition"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-48 sm:h-40 object-cover rounded-xl"
                  />

                  {/* DETAILS */}
                  <div className="flex-1 flex flex-col">

                    <div className="flex justify-between gap-4">

                      <div>
                        <h2 className="text-xl font-semibold">
                          {item.name}
                        </h2>

                        <p className="text-gray-400 mt-2">
                          Length: {item.inches}"
                        </p>

                        <p className="text-gold font-semibold mt-2">
                          KES {formatPrice(itemPrice)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.id,
                            item.inches
                          )
                        }
                        className="text-gray-500 hover:text-red-400 transition h-fit"
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiTrash2 size={20} />
                      </button>

                    </div>

                    {/* BOTTOM CONTROLS */}
                    <div className="flex items-center justify-between mt-auto pt-6">

                      {/* QUANTITY */}
                      <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.inches,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-2 hover:bg-white/10 disabled:opacity-30 transition"
                        >
                          <FiMinus size={14} />
                        </button>

                        <span className="px-4">
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
                          className="px-3 py-2 hover:bg-white/10 transition"
                        >
                          <FiPlus size={14} />
                        </button>

                      </div>

                      {/* ITEM TOTAL */}
                      <p className="font-semibold text-lg">
                        KES {formatPrice(itemTotal)}
                      </p>

                    </div>

                  </div>

                </motion.div>
              );

            })}

          </div>

          {/* ORDER SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-fit bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl lg:sticky lg:top-28"
          >

            <h2 className="text-2xl font-semibold mb-8">
              Order Summary
            </h2>

            {/* SUBTOTAL */}
            <div className="flex justify-between text-gray-400 mb-5">
              <span>Subtotal</span>

              <span>
                KES {formatPrice(totalAmount)}
              </span>
            </div>

            {/* WIG INSTALLATION */}
            <button
              type="button"
              onClick={() =>
                setInstallationSelected(!installationSelected)
              }
              className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border transition text-left mb-6 ${
                installationSelected
                  ? "border-gold bg-gold/10"
                  : "border-white/10 bg-white/5 hover:border-gold/40"
              }`}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                    installationSelected
                      ? "bg-gold border-gold text-black"
                      : "border-gray-500"
                  }`}
                >
                  {installationSelected && (
                    <FiCheck size={14} />
                  )}
                </div>

                <div>
                  <p className="font-semibold">
                    Wig Installation
                  </p>

                  <p className="text-sm text-gray-400">
                    Professional installation service
                  </p>
                </div>

              </div>

              <span className="text-gold font-semibold whitespace-nowrap">
                + KES {formatPrice(installationFee)}
              </span>

            </button>

            {/* INSTALLATION FEE */}
            {installationSelected && (
              <div className="flex justify-between text-gray-400 mb-5">
                <span>Installation</span>

                <span>
                  KES {formatPrice(installationFee)}
                </span>
              </div>
            )}

            {/* TOTAL */}
            <div className="border-t border-white/10 pt-5 flex justify-between items-center">

              <span className="text-lg font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold text-gold">
                KES {formatPrice(finalTotal)}
              </span>

            </div>

            <button
  onClick={() => navigate("/order")}
  className="w-full bg-gold text-black py-3.5 rounded-md font-semibold mt-8 hover:bg-yellow-600 transition"
>
  Proceed to Order
</button>

            <p className="text-gray-500 text-sm text-center mt-5">
              You will be able to review your order before submitting.
            </p>

          </motion.div>

        </div>

      )}

    </div>

  </div>

</motion.div>

);
}

export default CartPage;
