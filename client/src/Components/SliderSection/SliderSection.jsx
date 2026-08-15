import React from "react";
import "./SliderSection.css";

function SliderSection({ title, Component }) {
  return (
    <section className="slider-section">
      <div className="section-heading">
        <img
          className="section-icon"
          src="https://www.ugaoo.com/cdn/shop/files/Bestseller-1_2x_9a883cf1-58ba-4c74-badf-f02924575b68_small.png?v=1656416175"
          alt="Section badge"
        />
        <h2>{title}</h2>
      </div>
      <div className="slider-body">
        <Component />
      </div>
    </section>
  );
}

export default SliderSection;
