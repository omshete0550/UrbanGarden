import React from "react";
import { Link } from "react-router-dom";
import "./UserSeller.css";
import { userSeller1, userSeller2 } from "../../assets";

const UserSeller = () => {
  return (
    <section className="growSection" id="userSeller">
      <div className="growHeader">
        <span className="growTag">BE PART OF THE JOURNEY</span>

        <h1>
          Grow With <span>UrbanGarden</span>
        </h1>

        <p>
          Whether you're looking for your next plant or growing a nursery
          business, UrbanGarden has a place for you.
        </p>
      </div>

      <div className="growCards">
        {/* CUSTOMER */}
        <div className="growCard">
          <div className="growImage">
            <img src={userSeller1} alt="UrbanGarden customer" />

            <div className="growImageOverlay"></div>

            <div className="growCardLabel">
              <span>01</span>
              <p>FOR GARDENERS</p>
            </div>
          </div>

          <div className="growContent">
            <h2>Find Your Next Plant</h2>

            <p>
              Explore beautiful plants, gardening essentials, trending products
              and everything you need to create your own green space.
            </p>

            <Link to="/home" className="growButton">
              Start Shopping
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* NURSERY SELLER */}
        <div className="growCard">
          <div className="growImage">
            <img src={userSeller2} alt="UrbanGarden nursery seller" />

            <div className="growImageOverlay"></div>

            <div className="growCardLabel">
              <span>02</span>
              <p>FOR NURSERIES</p>
            </div>
          </div>

          <div className="growContent">
            <h2>Grow Your Nursery</h2>

            <p>
              Showcase your plants, connect with new customers and take your
              nursery business online with UrbanGarden.
            </p>

            <Link to="/register" className="growButton">
              Add Your Nursery
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSeller;
