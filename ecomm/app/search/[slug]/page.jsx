"use client";

import { useParams } from "next/navigation";
import { useProductContext } from "../../context/ProductContext";
import React from "react";
import Product from "../../components/Product";

const page = ({ params }) => {
  const { slug } = useParams();

  const { products } = useProductContext();
  const items = products.filter((product) =>
    product.title.toLowerCase().includes(slug.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-center mt-3">
        Search Results for "<span className="text-danger">{slug}</span>"
      </h1>
      <Product items={items} />
    </div>
  );
};

export default page;
