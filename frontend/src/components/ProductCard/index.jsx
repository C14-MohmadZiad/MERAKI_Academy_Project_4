import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function ProductCard({ product }) {
  if (!product) return null;
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="pc-link">
        <div className="pc-image-wrapper">
          <img src={product.image} alt={product.name} className="pc-image" />
        </div>
        <div className="pc-content">
          <h3 className="pc-name">{product.name}</h3>
          <p className="pc-price">{product.price} JOD</p>
        </div>
      </Link>
    </div>
  );
}
