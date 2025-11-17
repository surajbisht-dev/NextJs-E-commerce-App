"use client";

import React from "react";
import { useProductContext } from "../context/ProductContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const { cart, clearCart } = useProductContext();
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="container my-5" style={{ width: "55%" }}>
        {cart.length === 0 ? (
          <div className="text-center">
            <h1>Your cart is empty</h1>
            <Link href={"/"} className="btn btn-warning">
              Continue Shopping...
            </Link>
          </div>
        ) : (
          cart.map((product) => (
            <div
              key={product._id}
              className="card my-5 mb-3 bg-dark text-light"
              style={{ width: "700px", margin: "auto" }}
            >
              <div className="row g-0 text-center">
                {/* IMAGE CENTERED */}
                <div className="col-md-4 d-flex justify-content-center align-items-center p-3">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="img-fluid"
                    style={{
                      width: "200px",
                      borderRadius: "10px",
                      border: "1px solid yellow",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>

                    <button className="btn btn-primary mx-3">
                      Price: {product.price} ₹
                    </button>
                    <button className="btn btn-danger mx-3">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CLEAR CART BUTTON */}
      {cart.length > 0 && (
        <button
          onClick={() => {
            clearCart();
            router.refresh(); // refresh page
          }}
          className="btn btn-danger"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default page;
