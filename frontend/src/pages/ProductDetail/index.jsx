import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(location.state?.product || null);
  const [showModal, setShowModal] = useState(false);

  const selectedFromRedux = useSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    // إذا لم يتم تمرير المنتج عبر state، حاول جلبه من الباكند
    if (!location.state?.product) {
      api
        .get(`/products/${id}`)
        .then((res) => {
          setProduct(res.data?.data || res.data);
        })
        .catch((err) => {
          // استخدم fallback من الريدوكس إذا موجود
          if (selectedFromRedux?.id?.toString() === id) {
            setProduct(selectedFromRedux);
          } else {
            setProduct(null);
          }
        });
    }
  }, [id, selectedFromRedux, location.state]);

  const handleAddToCart = () => {
    const fixedProduct = {
      ...product,
      price: Number(product.price) || 0,
    };
    dispatch(addToCart(fixedProduct));
    setShowModal(true);
  };

  const handleDelete = () => {
    api
      .delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("Product deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete product");
      });
  };

  const handleCloseModal = () => setShowModal(false);

  if (!product) return <p className="loading">Product not found.</p>;

  const canDelete =
    user &&
    (user.role === "admin" ||
      user._id === product.provider?._id?.toString() ||
      user._id === product.provider?.toString());

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price} JOD</p>
          <button className="add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {canDelete && (
            <button className="delete-btn" onClick={handleDelete}>
              Delete Product
            </button>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Added to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Product "<strong>{product.name}</strong>" has been added to your
            cart.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Continue Shopping
          </Button>
          <Button variant="primary" onClick={() => navigate("/cart")}>
            Go to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetail;
