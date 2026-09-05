import React, { useState } from "react";
import "./SummaryItem.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reset } from "../../redux/slices/Cartslice";
import { logOut } from "../../redux/slices/userSlice";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../lib/apiBase";

const SummaryItem = () => {
  const storedCart = useSelector((state) => state.cart);
  const products = Array.isArray(storedCart.products) ? storedCart.products : [];

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const subtotal = products.reduce(
    (total, product) =>
      total + (Number(product.price) || 0) * (Number(product.quantity) || 0),
    0
  );
  const cart = { ...storedCart, total: subtotal };
  const platformFee = products.length > 0 ? 20 : 0;
  const totalPayable = subtotal + platformFee;
  const totalAmtWithPlatformFee = totalPayable;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = async (data) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/orders`,
        data,
        { withCredentials: true }
      );

      if (res.status === 201) {
        dispatch(reset());
        navigate("/Home");
        return true;
      }
    } catch (err) {
      const status = err.response?.status;

      if (status === 401 || status === 403) {
        dispatch(logOut());
        navigate("/Login", {
          state: { message: "Your session has expired. Please sign in again to place your order." },
        });
        return false;
      }

      console.error("Unable to create order:", err);
      return false;
    }
  };

  return (
    <div className="summaryContainer">
      <div className="summaryCard">
        {/* HEADER */}
        <div className="summaryHeader">
          <div>
            <p className="eyebrow">Order Summary</p>
            <h2 className="title">Price Details</h2>
          </div>
          <span className="summaryBadge">⚡ Fast delivery</span>
        </div>

        <p className="summarySubtitle">
          Secure checkout with encrypted payment and instant order processing.
        </p>

        {/* PRICE BREAKDOWN */}
        <div className={`priceCard ${products.length === 0 ? "emptyCart" : ""}`}>
          <div className="row">
            <span>Total MRP</span>
            <strong>₹ {cart.total}</strong>
          </div>

          <div className="row success">
            <span>Discounts</span>
            <strong>- ₹ 0.00</strong>
          </div>

          <div className="row success">
            <span>Coupon Savings</span>
            <strong>- ₹ 0.00</strong>
          </div>

          <div className="row">
            <span>Platform Fee</span>
            <strong>₹ {platformFee}</strong>
          </div>

          <div className="row success">
            <span>Shipping</span>
            <strong>FREE</strong>
          </div>
        </div>

        {/* TOTAL HERO */}
        <div className="grandTotal">
          <span>Total Payable</span>
          <strong>₹ {totalAmtWithPlatformFee}</strong>
        </div>

        {/* ACTIONS */}
        <div className="actions">
          {open ? (
            <div className="paymentMethods">
              <button
                className="payButton"
                onClick={() => {
                  setOpen(false);
                  setCash(true);
                }}
              >
                Cash on Delivery
              </button>

              <p className="paymentHint">
                Online payments are currently unavailable.
              </p>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className="button">
              Place Secure Order
            </button>
          )}
        </div>
      </div>

      {cash && (
        <OrderDetail
          total={totalPayable}
          createOrder={createOrder}
          onClose={() => setCash(false)}
        />
      )}
    </div>
  );
};

export default SummaryItem;

