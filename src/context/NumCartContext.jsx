import React, { createContext, useState } from 'react';


export const NumItemContext = createContext(null);


export default function NumCartContextProvider({ children }) {
  const [cart, setCart] = useState(0);
  const [wishlist, setWishlist] = useState(0);

 
  function addToCart() {
    setCart(prevCart => prevCart + 1);
  }
  function addToWish() {
    setCart(prevWish => prevWish + 1);
  }

  return (
    <NumItemContext.Provider value={{ cart, setCart, addToCart , wishlist, setWishlist,addToWish }}>
      {children}
    </NumItemContext.Provider>
  );
}
