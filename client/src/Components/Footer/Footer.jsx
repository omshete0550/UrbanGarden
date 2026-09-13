import React from "react";
import "./FooterStyles.css";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCreditCard,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import {
  facebook,
  instagram,
  logoFav,
  twitter,
  linkedin,
  email,
} from "../../assets";

const shopLinks = ["Plants", "Seeds", "Pots", "Soil", "Pebbles", "Accessories"];
const companyLinks = ["About Us", "Partner Nurseries", "Careers", "Contact"];
const supportLinks = [
  "Track Order",
  "Shipping",
  "Returns",
  "Plant Care",
  "FAQ",
];

const Footer = () => {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="footer-sec">
      <div className="footer-trust">
        <div className="trust-item">
          <FiTruck />
          <span>Nursery listings</span>
        </div>
        <div className="trust-item">
          <FiShield />
          <span>Plant care information</span>
        </div>
        <div className="trust-item">
          <FiCreditCard />
          <span>Order management</span>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="Urban Garden home">
            <img src={logoFav} className="footer-logo-img" alt="Urban Garden" />
            <span>Urban Garden</span>
          </Link>
          <p>
            Browse plants, seeds, pots, and gardening essentials from nursery
            listings in one place.
          </p>
          <div className="footer-contact">
            <span>
              <FiMapPin /> Browse nurseries by location
            </span>
            <span>
              <FiPhone /> Contact details are listed by each nursery
            </span>
            <span>
              <FiMail /> Sign in to manage orders and addresses
            </span>
          </div>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          {shopLinks.map((link) => (
            <Link to="/home" key={link}>
              {link}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          {companyLinks.map((link) => (
            <Link to="/" key={link}>
              {link}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          {supportLinks.map((link) => (
            <Link to="/" key={link}>
              {link}
            </Link>
          ))}
        </div>

        <div className="footer-newsletter">
          <h3>Join the Garden Club</h3>
          <p>Get plant care tips, new drops, and seasonal offers.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <img src={email} alt="" aria-hidden="true" />
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              <FiArrowRight />
            </button>
          </form>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.facebook.com" aria-label="Facebook">
              <img src={facebook} alt="" />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram">
              <img src={instagram} alt="" />
            </a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
              <img src={linkedin} alt="" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <img src={twitter} alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2026 Urban Garden. All rights reserved.</p>
        <div>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms</Link>
          <Link to="/">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
