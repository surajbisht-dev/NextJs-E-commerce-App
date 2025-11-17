"use client";

import React, { use } from "react";
import Product from "./components/Product";
import { useProductContext } from "./context/ProductContext";

const page = () => {
  const { data } = useProductContext();
  console.log("Context hook data:", useProductContext());

  return (
    <div>
      <Product items={data} />
    </div>
  );
};

export default page;
