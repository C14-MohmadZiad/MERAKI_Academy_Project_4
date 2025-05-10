import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "./style.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product ", err);
      });
  }, [id]);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Product added to cart!");
  };
  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>{product.price} JOD</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
