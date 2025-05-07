import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [lastPage, setLastPage] = useState("/");

  const addToCart = (book, fromPage) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === book.id);
      if (exists) {
        return prev.map((i) =>
          i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    

    const exists = cartItems.find((item) => item.id === book.id);

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  // Update quantity of a specific book
  const updateQuantity = (id, quantity) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCartItems(updated);
  };

  // Optional: remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, lastPage, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
