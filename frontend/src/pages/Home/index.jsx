import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setProducts } from "../../redux/productSlice";
import ProductCard from "../../components/ProductCard";

import "./style.css";

const Home = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.products.items);

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

  return (
    <div className="home-grid">
      {items.map((prod) => (
        <ProductCard key={prod._id} product={prod} />
      ))}
    </div>
  );
};

export default Home;
