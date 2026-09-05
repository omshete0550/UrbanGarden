import React from "react";
import "./AddtoCartItem.css";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  updateProductQuantity,
} from "../../redux/slices/Cartslice";
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const AddtoCartItem = ({ product }) => {
  const dispatch = useDispatch();
  const count = Number(product.quantity) || 1;

  const incrementCount = () => {
    dispatch(updateProductQuantity({ productId: product._id, quantity: count + 1 }));
  };

  const decrementCount = () => {
    if (count > 1) {
      dispatch(updateProductQuantity({ productId: product._id, quantity: count - 1 }));
    }
  };

  const handleremove = () => {
    dispatch(removeProduct(product._id));
  };

  return (
    <div className="cartCard">
      <div className="itemImage">
        <img src={product.photos?.[0]} alt={product.name} />
        <span className="itemBadge">Premium</span>
      </div>

      <div className="itemDetails">
        <div>
          <h2>{product.name}</h2>
          <p className="itemByline">by {product.nurseryId}</p>
        </div>

        <div className="itemMeta">
          <div className="itemRating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span>{product.rating ?? 4.8}</span>
          </div>
        </div>
      </div>

      <div className="itemPricing">
        <div className="priceBlock">
          <span>Unit price</span>
          <strong>₹ {product.price}</strong>
        </div>

        <div className="qtyControl">
          <button onClick={decrementCount} disabled={count === 1}>
            −
          </button>
          <span>{count}</span>
          <button onClick={incrementCount}>+</button>
        </div>

        <div className="totalBlock">
          <span>Total</span>
          <strong>₹ {product.price * count}</strong>
        </div>

        <button className="removeBtn" onClick={handleremove}>
          <MdDelete />
          Remove
        </button>
      </div>
    </div>
  );
};

export default AddtoCartItem;

