import Cart from "../models/Cart";
import { NextResponse } from "next/server";

// add items to cart
export const addToCart = async (req) => {
  const body = await req.json();
  try {
    const newCart = await Cart.create(body);
    return NextResponse.json(
      {
        message: "Item added to cart successfully",
        cartItem: newCart,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

// get all cart items
export const getCartItems = async (req) => {
  try {
    const cartItems = await Cart.find({});
    return NextResponse.json(
      {
        message: "Cart items fetched successfully",
        cartItems: cartItems,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

// clear all cart items

export const clearCart = async (req) => {
  await Cart.deleteMany({});
  return NextResponse.json(
    {
      message: "Cart cleared successfully..",
      succcess: true,
    },
    { status: 200 }
  );
};
