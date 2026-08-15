import React from "react";
import Header from "../../Components/Header/Header";
import AddtoCartItem from "../../Components/AddtoCartItem/AddtoCartItem";
import SummaryItem from "../../Components/AddtoCartItem/SummaryItem";
import "./AddtoCartPage.css";
import { useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";

const AddtoCartPage = () => {
  const cart = useSelector((state) => state.cart);
  const cartData = cart.products;

  return (
    <div className="cartPage">
      <Header />

      {/* HERO SECTION */}
      <div className="cartHero">
        <div>
          <p className="eyebrow">Your Cart</p>
          <h1>Secure Checkout</h1>
          <p className="subtitle">
            Review items, apply discounts, and complete your purchase securely.
          </p>
        </div>

        <div className="cartBadge">
          <span>{cartData.length}</span> items
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="cartLayout">
        {/* LEFT - ITEMS */}
        <div className="cartItems">
          {cartData.length === 0 ? (
            <div className="emptyCart">
              <h2>Your cart is empty</h2>
              <p>Add something amazing ✨</p>
            </div>
          ) : (
            cartData.map((item) => (
              <AddtoCartItem product={item} key={item._id} />
            ))
          )}
        </div>

        {/* RIGHT - STICKY SUMMARY */}
        <div className="cartSummary">
          <SummaryItem />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddtoCartPage;
