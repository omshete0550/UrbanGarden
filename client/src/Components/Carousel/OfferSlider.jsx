import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLeaf,
  FaSeedling,
  FaShoppingBag,
} from "react-icons/fa";
import carousel1 from "../../assets/Home/carousel1.jpeg";
import carousel2 from "../../assets/Home/carousel3.jpeg";
import carousel4 from "../../assets/Home/carousel2.jpeg";
import plant from "../../assets/category/plant.png";
import pot from "../../assets/category/pot.png";
import seed from "../../assets/category/seed.jpg";
import "./OfferSlider.css";

const highlights = [
  { icon: <FaLeaf />, label: "Healthy plants" },
  { icon: <FaSeedling />, label: "Fresh seeds" },
  { icon: <FaShoppingBag />, label: "Curated pots" },
];

const categories = [
  { title: "Indoor plants", image: plant, path: "/category/Plants" },
  { title: "Designer pots", image: pot, path: "/category/Pots" },
  { title: "Seeds", image: seed, path: "/category/Seeds" },
];

const OfferSlider = () => {
  return (
    <section className="shop-hero" aria-label="Urban Garden featured products">
      <div className="shop-hero__content">
        <p className="shop-hero__eyebrow">Fresh picks for your garden</p>
        <h1>Build a greener corner, without the guesswork.</h1>
        <p className="shop-hero__copy">
          Shop nursery-ready plants, planters, seeds, and garden essentials
          selected for homes, balconies, and everyday plant care.
        </p>

        <div className="shop-hero__actions">
          <Link className="shop-hero__primary" to="/category/Plants">
            Shop plants <FaArrowRight />
          </Link>
          <Link className="shop-hero__secondary" to="/category/Pots">
            Explore pots
          </Link>
        </div>

        <div className="shop-hero__highlights">
          {highlights.map((item) => (
            <span key={item.label}>
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="shop-hero__visual">
        <img
          className="shop-hero__main-img"
          src={carousel1}
          alt="Decorative planters and house plants"
        />
        <img
          className="shop-hero__float shop-hero__float--one"
          src={carousel2}
          alt=""
        />
        <img
          className="shop-hero__float shop-hero__float--two"
          src={carousel4}
          alt=""
        />
      </div>

      <div className="shop-hero__categories" aria-label="Featured categories">
        {categories.map((category) => (
          <Link
            to={category.path}
            className="shop-hero__category"
            key={category.title}
          >
            <img src={category.image} alt="" />
            <span>{category.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OfferSlider;
