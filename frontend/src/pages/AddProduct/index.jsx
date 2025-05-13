import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/productSlice";
import api from "../../services/api";
import "./style.css"
const AddProductPage = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Check the permmisons
  if (!user || user.role !== "provider") {
    return <h2>Unauthorized - You are not A provider.</h2>;
  }

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/products", formData)
      .then((response) => {
        dispatch(addProduct(response.data));
        alert("Product added successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to add product", err);
        alert("Error adding product");
      });
  };
  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>

        <label>
          Name
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        </label>
        <label>
          Description
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        </label>
        <label>
          Price
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <label>
        </label>
        Image URL
        <input name="image" placeholder="Image URL" onChange={handleChange} />
        </label>
        <label>
          Category
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
       </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
