import React from "react";

import "./style.css";

export default function ProductCard({ product }) {
    if (!product) return null; 
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="pc-image" />
      <h3 className="pc-name">{product.name}</h3>
      <p className="pc-price">{product.price} JOD</p>
    </div>
  );
}
