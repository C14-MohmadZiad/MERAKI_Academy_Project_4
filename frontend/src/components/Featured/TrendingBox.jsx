// components/Featured/TrendingBox.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../redux/productSlice"; 
import "./TrendingBox.css";

const trendingProducts = [
  {
    id: 1,
    label: "Best Sellers",
    image: "https://images.unsplash.com/photo-1726828515573-869457542075?w=400&auto=format&fit=crop&q=60",
    name: "iPhone 16e",
    description: "The latest iPhone with smart features",
    price: 1777,
  },
  {
    id: 2,
    label: "Limited Offer",
    image: "https://images.unsplash.com/photo-1738830274216-20f63b8a0c02?w=400&auto=format&fit=crop&q=60",
    name: "Galaxy s25 Ultra",
    description: "High-end Samsung phone with best camera",
    price: 1555,
  },
];

const TrendingBox = () => {
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(setSelectedProduct(item)); 
  };

  return (
    <div className="trending-box">
      {trendingProducts.map((item) => (
        <Link
          to={`/product/${item.id}`}
          key={item.id}
          className="trending-card"
          onClick={() => handleClick(item)} 
        >
          <div className="trending-img">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="trending-info">
            <span className="trending-badge">{item.label}</span>
            <p className="trending-name">{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TrendingBox;
