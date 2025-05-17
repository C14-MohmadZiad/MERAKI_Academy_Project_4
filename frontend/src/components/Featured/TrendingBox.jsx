import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./TrendingBox.css";

const trendingProducts = [
  {
    id: 1,
    label: "Best Sellers",
    image:
      "https://images.unsplash.com/photo-1726828515573-869457542075?w=400&auto=format&fit=crop&q=60",
    name: "iPhone 16e",
    description: "The latest iPhone with smart features",
    price: 1777,
  },
  {
    id: 2,
    label: "Limited Offer",
    image:
      "https://images.unsplash.com/photo-1738830274216-20f63b8a0c02?w=400&auto=format&fit=crop&q=60",
    name: "Galaxy s25 Ultra",
    description: "High-end Samsung phone with best camera",
    price: 1555,
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 550,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 8000,
  pauseOnHover: true,
};

const TrendingSlider = () => (
  <div className="trending-slider-single">
    <Slider {...settings}>
      {trendingProducts.map((item) => (
        <div key={item.id}>
          {/* استخدم Link مع state */}
          <Link
            to={`/product/${item.id}`}
            state={{ product: item }}
            style={{ textDecoration: "none" }}
          >
            <div className="trending-card-single">
              <div className="trending-img-single">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="trending-info-single">
                <span className="trending-badge-single">{item.label}</span>
                <div className="trending-name-single">{item.name}</div>
                <div className="trending-desc-single">{item.description}</div>
                <div className="trending-bottom-single">
                  <span className="trending-price-single">${item.price}</span>
                  <span className="trending-arrow-single">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  </div>
);

export default TrendingSlider;
