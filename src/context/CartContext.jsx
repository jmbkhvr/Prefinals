import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // ✅ Load cart from localStorage (if exists)
    const saved = localStorage.getItem("cartData");
    return saved ? JSON.parse(saved) : [];
  });

  // 🧠 Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }, [cart]);

  // Add to cart (or increase quantity)
  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Remove item
  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  // Update quantity
  function updateQuantity(id, qty) {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  }

  // Clear cart
  function clearCart() {
    setCart([]);
    localStorage.removeItem("cartData");
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
