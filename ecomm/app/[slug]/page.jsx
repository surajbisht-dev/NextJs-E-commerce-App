"use client";

import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import Product from "../components/Product";
import { useParams } from "next/navigation";

const page = ({ params }) => {
  const { slug } = useParams();

  const { products } = useProductContext();

  const [productById, setProductById] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = products.find((p) => p._id === slug);

    if (filterProduct) {
      setProductById(filterProduct);

      const related = products.filter(
        (p) => p.category === filterProduct.category && p._id !== slug
      );

      setRelatedProducts(related);
    }
  }, [slug, products]);

  if (!productById) {
    return (
      <h1 className="text-center my-5 " style={{ marginTop: "15rem" }}>
        Loading...
      </h1>
    );
  }

  return (
    <div>
      <div className="container my-5">
        <div className="row align-items-center">
          {" "}
          {/* FIXED */}
          <div className="col-md-6 d-flex justify-content-center align-items-center p-3">
            <img
              src={productById.imgSrc}
              alt={productById.title}
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "auto",
                borderRadius: "10px",
                border: "1px solid yellow",
              }}
            />
          </div>
          <div className="col-md-6 text-center">
            <h1 className="card-title">{productById.title}</h1>
            <p className="card-text">{productById.description}</p>

            <button className="btn btn-primary mx-3">
              Price: {productById.price} ₹
            </button>
            <button className="btn btn-danger mx-3">Buy Now</button>
          </div>
        </div>
      </div>

      {/* related products */}
      <h1 className="text-center my-5">Related Products</h1>
      <Product items={relatedProducts} />
    </div>
  );
};

export default page;
