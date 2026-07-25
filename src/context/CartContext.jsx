// src/context/CartContext.jsx

import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product, inches, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.inches === inches
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.inches === inches
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            inches,
            quantity,
          },
        ];
      }
    });

    setIsOpen(true);
  };

  const removeFromCart = (productId, inches) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productId &&
            item.inches === inches
          )
      )
    );
  };

  const updateQuantity = (
    productId,
    inches,
    quantity
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId &&
        item.inches === inches
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // Clear the entire cart after a successful order
  const clearCart = () => {
    setCartItems([]);
    setIsOpen(false);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      (
        item.basePrice +
        (item.inches - item.startingLength) *
          item.pricePerExtraInch
      ) *
        item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}