import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { zoomIn } from "../../motion";
import "./ProductSlider.css";

const Product = (props) => {
  const getShortDescription = (description, maxLength = 54) => {
    if (!description) {
      return "A fresh garden pick selected for your space.";
    }
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <article className="card">
      <Link className="product-link" to={`/Products/${props.idx}`}>
        <div className="product-image-wrap">
          <motion.img
            variants={zoomIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.2 }}
            className="product--image"
            src={props.url}
            alt={props.name || "Garden product"}
          />
          <span className="product-badge">Fresh pick</span>
          <button
            className="wishlist-button"
            type="button"
            aria-label={`Save ${props.name}`}
            onClick={(event) => event.preventDefault()}
          >
            <FaHeart />
          </button>
        </div>
        <div className="detail">
          <h2>{props.name}</h2>
          <p className="product-p">{getShortDescription(props.description)}</p>
        </div>
        <div className="product-meta">
          <div className="rating">
            <span className="rating-value">4.0</span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <span className="rating-label">Rating</span>
          </div>
          <p className="price">Rs. {props.price}</p>
        </div>
      </Link>
      <div className="card-actions">
        <Link
          className="details-button"
          to={`/Products/${props.idx}`}
          aria-label={`View details for ${props.name}`}
        >
          View Details
        </Link>
        <button className="add-card-button" type="button">
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
