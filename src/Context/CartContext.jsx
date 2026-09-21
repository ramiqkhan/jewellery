import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart from localStorage if available so data persists on refresh
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('zelora_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('zelora_cart', JSON.stringify(cart));
  }, [cart]);

  // Add Item to Cart
  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    setCart((prevCart) => {
      // Check if item already exists in cart (matching ID + variant if applicable)
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.variant === selectedVariant
      );

      if (existingIndex > -1) {
        // Product exists: update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        // New product: add to cart
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            variant: selectedVariant,
          },
        ];
      }
    });

    // Automatically open the cart drawer/modal when adding an item
    setIsCartOpen(true);
  };

  // Remove Item from Cart
  const removeFromCart = (id, variant = null) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.variant === variant))
    );
  };

  // Update Item Quantity
  const updateQuantity = (id, variant = null, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, variant);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => setCart([]);

  // Calculate Total Price and Item Count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart Context easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}