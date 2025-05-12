import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setProducts } from "../../redux/productSlice";
import ProductCard from "../../components/ProductCard";
import { useSearchParams } from "react-router-dom";

import "./style.css";

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Subscribe to the Best Internet Offers</h1>
          <p>
            High speed, affordable price, and exclusive entertainment bundles
          </p>

          <button className="hero-btn">Explore Plans</button>
        </div>

        <div className="hero-image">
          <img src="https://media.istockphoto.com/id/2170143478/photo/happy-woman-using-smartphone-and-credit-card-for-online-shopping-on-sofa-at-home.jpg?s=612x612&w=0&k=20&c=nsxM2tpJSwjpnuTF1djtQbUgQlTzRgsJaEKKw2_4U1s=" />
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Our Top Fiber Plans</h2>
        <div className="product-grid">
          {filteredItems.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
