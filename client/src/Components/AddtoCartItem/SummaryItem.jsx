import React, { useEffect, useState } from "react";
import "./SummaryItem.css";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { reset } from "../../redux/slices/Cartslice";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../lib/apiBase";

const SummaryItem = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const amount = cart.total;
  const currency = "USD";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const platformFee = 20;
  const totalAmtWithPlatformFee = cart.total + platformFee;

  const createOrder = async (data) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/orders`,
        data,
      );

      if (res.status === 201) {
        dispatch(reset());
        navigate("/Home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
      paypalDispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency,
        },
      });
    }, [currency, options, paypalDispatch]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}

        <PayPalButtons
          forceReRender={[amount, currency]}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const shipping = details.purchase_units[0].shipping;

            createOrder({
              customerName: shipping.name.full_name,
              customerId: user.details._id,
              products: cart.products.map((item) => ({
                productId: item._id,
                nurseryId: item.nurseryId,
                quantity: item.quantity,
              })),
              address: shipping.address.address_line_1,
              amount: cart.total,
              method: 1,
            });
          }}
        />
      </>
    );
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
        <div className="priceCard">
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
              <button className="payButton" onClick={() => setCash(true)}>
                Cash on Delivery
              </button>

              <PayPalScriptProvider
                options={{
                  "client-id": "YOUR_PAYPAL_CLIENT_ID",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className="button">
              Place Secure Order
            </button>
          )}
        </div>
      </div>

      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default SummaryItem;

