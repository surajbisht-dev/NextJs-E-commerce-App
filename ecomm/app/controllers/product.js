import Product from "../models/Product";
import { NextResponse } from "next/server";

export const createProduct = async (req) => {
  const body = await req.json();

  try {
    const newProduct = await Product.create(body);

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

// get all products

export const getProducts = async (req) => {
  try {
    const products = await Product.find();
    return NextResponse.json(
      {
        products: products,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
