import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/productSlice";
import ProductCard from "../../components/ProductCard";
import api from "../../services/api";
import "./style.css";

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  // get all category
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category || "Uncategorized")),
  ];

  // filted depands on category
  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => (p.category || "Uncategorized") === selectedCategory
        );

  return (
    <div className="shop-page">
      <h2>Shop</h2>

      <div className="shop-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shop-grid">
        {filtered.length ? (
          filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
