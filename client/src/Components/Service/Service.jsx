import React from "react";
import "./Service.css";
import { service1, service2, service3, service4 } from "../../assets";

const Service = () => {
  return (
    <>
      <h1 className="serviceHeading">Why Urban Garden?</h1>
      <div className="services_container">
        <div className="service">
          <div className="service_icon">
            <img src={service1} alt="" />
          </div>
          <div className="service_text">
            <h3>Secure and Recyclable Packaging</h3>
          </div>
        </div>
        <div className="service">
          <div className="service_icon">
            <img src={service2} alt="" />
          </div>
          <div className="service_text">
            <h3>Free Replacements if Damaged</h3>
          </div>
        </div>
        <div className="service">
          <div className="service_icon">
            <img src={service3} alt="" />
          </div>
          <div className="service_text">
            <h3>Offers</h3>
          </div>
        </div>
        <div className="service">
          <div className="service_icon">
           <img src={service4} alt="" />
          </div>
          <div className="service_text">
            <h3>Self-Watering Pots with Every Plant</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
