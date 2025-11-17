"use client";

import React from "react";
import Link from "next/link";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useProductContext } from "../context/ProductContext";

const Product = ({ items }) => {
  const { addToCart, fetchCartItems } = useProductContext();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="container my-5">
        <div className="row">
          {(Array.isArray(items) ? items : []).map((product) => (
            <div
              key={product._id}
              className="col-lg-4 col-md-6 my-3 text-center d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-dark text-light"
                style={{ width: "18rem" }}
              >
                <Link href={`/${product._id}`}>
                  <div className="d-flex justify-content-center align-items-center p-3">
                    <img
                      src={product.imgSrc}
                      alt={product.title}
                      className="img-fluid card-img-top"
                      style={{
                        width: "200px",
                        borderRadius: "10px",
                        border: "1px solid yellow",
                      }}
                    />
                  </div>
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.description}</p>
                  <button className="btn btn-primary mx-3">
                    {product.price} ₹
                  </button>
                  <button
                    onClick={() => {
                      addToCart(
                        product.title,
                        product.imgSrc,
                        product.price,
                        toast
                      );
                      fetchCartItems();
                    }}
                    className="btn btn-warning "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
