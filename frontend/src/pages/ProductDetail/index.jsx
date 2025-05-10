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
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching product ", err);
      });
  }, [id]);
  const handleAddToCart = () => {
    const fixedProduct = {
      ...product,
      price: Number(product.price) || 0,
    };
  
    dispatch(addToCart(fixedProduct));
    console.log("Add successfuly", fixedProduct);
    console.log("🛒 Products", JSON.stringify(fixedProduct, null, 2));
  
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
