"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const api = await axios.get(`${API_BASE_URL}/products`);
      setProducts(api.data.products);
      setData(api.data.products);
    } catch (error) {
      console.error("fetchAllProducts error:", error);
    }
  };

  // Add to cart
  const addToCart = async (title, imgSrc, price, toast) => {
    try {
      const api = await axios.post(`${API_BASE_URL}/cart`, {
        title,
        imgSrc,
        price,
      });

      if (api.data.success) {
        toast.success(api.data.message, { autoClose: 1500 });
        fetchCartItems(); // refresh cart
      }
    } catch (err) {
      console.error("addToCart error:", err);
      toast?.error("Failed to add to cart");
    }
  };

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`);
      console.log("data", response.data.cartItems);

      setCart(response.data.cartItems || []);
    } catch (error) {
      console.error("fetchCartItems error:", error);
    }
  };

  const clearCart = async () => {
    const api = await axios.delete(`${API_BASE_URL}/cart`);
    if (api.data.success) {
      setCart([]);
      fetchCartItems();
    }
  };

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
        cart,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export default ProductContext;
