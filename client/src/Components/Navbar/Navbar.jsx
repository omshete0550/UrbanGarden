// Navbar.jsx

import React, { useEffect, useState } from "react";
import "./NavbarStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logo } from "../../assets";
import { Link as ScrollLink } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  const profilePath = user?.details?.username
    ? `/UserProfile/${user.details.username}`
    : "/Login";

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`nav ${isMenuOpen ? "menu-open" : ""} ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
          <button className="logo" onClick={handleClick} type="button">
            <img src={logo} alt="Urban Garden logo"></img>
            <h1>
              Urban <br></br> Garden
            </h1>
          </button>
          <div className={`links ${isMenuOpen ? "menu-open" : ""}`}>
            <Link to="/home">
              <div>Home</div>
            </Link>
            <ScrollLink
              activeClass="active"
              to="howtouse"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <div>How To Use</div>
            </ScrollLink>
            <ScrollLink
              activeClass="active"
              to="whyug"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <div>Why UG</div>
            </ScrollLink>
            {(user?.details?.nurseryId || user?.details?.nursuries) == null && user?.isAdmin && (
              <Link to="/SetupNursery">
                <div className="regBtnNav">Add a Nursery</div>
              </Link>
            )}
            {!user && (
              <Link to="/Login">
                <div className="regBtnNav">Log In</div>
              </Link>
            )}
            {!user && (
              <Link to="/Register">
                <div className="regBtnNav">Sign Up</div>
              </Link>
            )}
            {user && (
              <Link to={profilePath}>
                <div className="userProf">Hey, {user?.details.username}</div>
              </Link>
            )}
          </div>
          <button
            className="menu-icon"
            onClick={toggleMenu}
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;

