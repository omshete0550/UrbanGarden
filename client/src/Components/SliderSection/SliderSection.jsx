import React from "react";
import "./SliderSection.css";

function SliderSection({ title, Component }) {
  const formattedTitle = title
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  const eyebrow = title === "TRENDING" ? "Popular now" : "Shop by category";

  return (
    <section className="slider-section">
      <div className="section-heading">
        <div>
          <p>{eyebrow}</p>
          <h2>{formattedTitle}</h2>
        </div>
      </div>
      <div className="slider-body">
        <Component />
      </div>
    </section>
  );
}

export default SliderSection;
