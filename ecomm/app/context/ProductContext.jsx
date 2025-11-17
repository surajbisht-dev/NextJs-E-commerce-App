"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Use ENV variable with fallback to /api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      setProducts(res.data.products);
      setData(res.data.products);
    } catch (error) {
      console.error("fetchAllProducts error:", error);
    }
  };

  // Add to cart
  const addToCart = async (title, imgSrc, price, toast) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/cart`, {
        title,
        imgSrc,
        price,
      });

      if (res.data.success) {
        toast.success(res.data.message, { autoClose: 1500 });
        fetchCartItems();
      }
    } catch (err) {
      console.error("addToCart error:", err);
      toast?.error("Failed to add to cart");
    }
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/cart`);
      setCart(res.data.cartItems || []);
    } catch (error) {
      console.error("fetchCartItems error:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/cart`);
      if (res.data.success) {
        setCart([]);
        fetchCartItems();
      }
    } catch (error) {
      console.error("clearCart error:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAllProducts();
    fetchCartItems();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        data,
        cart,
        setData,
        addToCart,
        fetchCartItems,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export default ProductContext;
