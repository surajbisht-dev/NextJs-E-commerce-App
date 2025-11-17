"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useProductContext } from "../context/ProductContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { products, data, setData, cart } = useProductContext();

  const filterByCategory = (category) => {
    setData(products.filter((p) => p.category === category));
  };

  const filterByPrice = (price) => {
    setData(products.filter((p) => p.price >= price));
  };

  const pathname = usePathname();

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top p-3"
        style={{ backgroundColor: "blue" }}
      >
        <div className="container d-flex justify-content-center align-items-center">
          <Link href="/" className="navbar-brand fw-bold text-light">
            NextJs E-Commerce
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="d-flex flex-grow-1 mx-4">
            <div className="input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control border-secondary"
                placeholder="Search products..."
              />
              <button className="btn btn-danger" type="submit">
                <FaSearch />
              </button>
            </div>
          </form>

          <Link href="/cart" className="ms-2">
            <button className="btn btn-outline-warning position-relative">
              <FaShoppingCart size={15} className="fs-5 text-light" />
              {cart?.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </nav>

      {/* FILTER SECTION */}
      {pathname === "/" && (
        <div className="container">
          <div className="bg-dark text-light my-3">
            <div className="container p-3 rounded">
              <div className="row">
                {/* Category Buttons */}
                <div className="col-md-6 d-flex flex-wrap align-items-center gap-2">
                  <strong>Category:</strong>
                  <button
                    onClick={() => setData(products)}
                    className="btn btn-outline-light px-3"
                  >
                    All
                  </button>
                  <button
                    onClick={() => filterByCategory("mobiles")}
                    className="btn btn-outline-light px-3"
                  >
                    Mobile
                  </button>
                  <button
                    onClick={() => filterByCategory("laptops")}
                    className="btn btn-outline-light px-3"
                  >
                    Laptops
                  </button>
                  <button
                    onClick={() => filterByCategory("tablets")}
                    className="btn btn-outline-light px-3"
                  >
                    Tablets
                  </button>
                </div>

                {/* Price Buttons */}
                <div className="col-md-6 d-flex flex-wrap align-items-center gap-2">
                  <strong>Price:</strong>

                  <button
                    onClick={() => filterByPrice(29999)}
                    className="btn btn-outline-warning px-3"
                  >
                    ≥ 29,999
                  </button>
                  <button
                    onClick={() => filterByPrice(49999)}
                    className="btn btn-outline-warning px-3"
                  >
                    ≥ 49,999
                  </button>
                  <button
                    onClick={() => filterByPrice(69999)}
                    className="btn btn-outline-warning px-3"
                  >
                    ≥ 69,999
                  </button>
                  <button
                    onClick={() => filterByPrice(89999)}
                    className="btn btn-outline-warning px-3"
                  >
                    ≥ 89,999
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
