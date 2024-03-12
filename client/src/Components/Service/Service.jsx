import React from "react";
import "./Service.css";
import {
  FaTrophy,
  FaTruck,
  FaPercent,
  FaUsers,
  FaCaret,
  FaShoppingCart,
} from "react-icons/fa";

const Service = () => {
  return (
    <>
      <div className="services_container">
        <div className="service">
          <div className="service_icon">
            <FaUsers />
          </div>
          <div className="service_text">
            <h3>Help Centre</h3>
          </div>
        </div>
        <div className="service">
          <div className="service_icon">
            <FaTruck />
          </div>
          <div className="service_text">
            <h3>Track Order</h3>
          </div>
        </div>
        <div className="service">
          <div className="service_icon">
            <FaPercent />
          </div>
          <div className="service_text">
            <h3>Offers</h3>
          </div>
        </div>
        <div className="service">
          <div className="service_icon">
            <FaTrophy />
          </div>
          <div className="service_text">
            <h3>Rewards</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
