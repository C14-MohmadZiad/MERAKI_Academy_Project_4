import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setProducts } from "../../redux/productSlice";
import ProductCard from "../../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import FeaturedSlider from "../../components/Featured/FeaturedSlider";
import TrendingBox from "../../components/Featured/TrendingBox";
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

  const categories = Array.from(
    new Set(filteredItems.map((item) => item.category || "Uncategorized"))
  );

  return (
    <div className="home-page">
      <div className="highlight-fullwidth">
        <div className="highlight-inner">
          <div className="slider-side">
            <FeaturedSlider />
          </div>
          <div className="trending-side">
            <TrendingBox />
          </div>
        </div>
      </div>

      <div id="products-section" className="home-container">
        {categories.map((cat) => {
          const prodsInCat = filteredItems.filter(
            (p) => (p.category || "Uncategorized") === cat
          );
          return (
            <section key={cat} className="products-section">
              <h2 className="section-title">{cat}</h2>
              <div className="product-grid">
                {prodsInCat.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
