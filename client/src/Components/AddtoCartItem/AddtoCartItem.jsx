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
    dispatch(
      updateProductQuantity({ productId: product._id, quantity: count + 1 }),
    );
  };

  const decrementCount = () => {
    if (count > 1) {
      dispatch(
        updateProductQuantity({ productId: product._id, quantity: count - 1 }),
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeProduct(product._id));
  };

  return (
    <article className="cartCard">
      <div className="itemImage">
        <img src={product.photos?.[0]} alt={product.name} />
        <span className="itemBadge">{product.category || "Garden item"}</span>
      </div>

      <div className="itemDetails">
        <div className="itemCopy">
          <h2>{product.name}</h2>
          <p className="itemByline">by {product.nurseryId || "Urban Garden"}</p>
        </div>

        <div className="itemMeta">
          {Number(product.rating) > 0 ? (
            <div className="itemRating" aria-label={`Rated ${product.rating} out of 5`}>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} aria-hidden="true" />
              ))}
              <span>{Number(product.rating).toFixed(1)}</span>
            </div>
          ) : (
            <span className="itemRatingEmpty">No ratings yet</span>
          )}

          <div className="itemPrice">
            <span>Unit price</span>
            <strong>{"\u20B9"} {product.price}</strong>
          </div>
        </div>
      </div>

      <div className="itemControls">
        <div className="qtyControl" aria-label={`Quantity: ${count}`}>
          <button
            type="button"
            onClick={decrementCount}
            disabled={count === 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{count}</span>
          <button
            type="button"
            onClick={incrementCount}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="removeBtn"
          onClick={handleRemove}
          aria-label={`Remove ${product.name} from cart`}
          title="Remove item"
        >
          <MdDelete />
          <span>Remove</span>
        </button>
      </div>
    </article>
  );
};

export default AddtoCartItem;
