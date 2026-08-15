import React, { useEffect, useState } from "react";
import {
  FaCaretDown,
  FaHome,
  FaPlusCircle,
  FaSearch,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";

import {
  FiMenu,
  FiX,
  FiUser,
  FiPackage,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logo } from "../../assets";
import "./Header.css";
import { logOut } from "../../redux/slices/userSlice";
import { API_BASE_URL } from "../../lib/apiBase";

const categories = [
  "Gardening",
  "Plants",
  "Seeds",
  "Bulbs",
  "Pots",
  "Soil & Fertilizer",
  "Pebbles",
  "Accessories",
];

const Header = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const username = user?.details?.username || "Guest";
  const isNurseryOwner = Boolean(user?.isAdmin);
  const nurseryId = (user?.details?.nurseryId || user?.details?.nursuries);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/Login");
  };

  useEffect(() => {
    document.body.classList.toggle("menu-lock", menuOpen);

    return () => {
      document.body.classList.remove("menu-lock");
    };
  }, [menuOpen]);

  function handleLogoClick() {
    navigate("/");
  }

  async function handleSearch(event) {
    event.preventDefault();
    const query = search.trim();

    if (!query) {
      setSearchError("Enter a product name to search.");
      return;
    }

    try {
      setIsSearching(true);
      setSearchError("");
      const res = await axios.get(
        `${API_BASE_URL}/products/username/${query}`,
      );
      const firstProduct = res.data?.[0];

      if (!firstProduct?._id) {
        setSearchError("No matching product found.");
        return;
      }

      navigate(`/Products/${firstProduct._id}`);
    } catch (error) {
      setSearchError("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-up">
          <button className="logo-div" onClick={handleLogoClick} type="button">
            <img src={logo} alt="Urban Garden logo" width="80" height="80" />
            <h1>
              Urban <br /> Garden
            </h1>
          </button>

          <form className="search-div" onSubmit={handleSearch}>
            <label className="all-categories" htmlFor="categories">
              <select name="categories" id="categories">
                <option value="Categories">Categories</option>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FaCaretDown
                className="category-select-icon"
                aria-hidden="true"
              />
            </label>
            <div className="search-bar">
              <input
                type="search"
                className="searchbar"
                placeholder="Search plants, seeds, pots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="searchicon"
                type="submit"
                disabled={isSearching}
              >
                <FaSearch className="search-icon" />
                <span>{isSearching ? "Searching" : "Search"}</span>
              </button>
            </div>
            {searchError && <p className="search-error">{searchError}</p>}
          </form>

          <div className="buttons-div">
            <div className="account-wrapper">
              <button
                className="account-btn"
                onClick={() => setAccountOpen(!accountOpen)}
                type="button"
              >
                <FiUser />
              </button>

              {accountOpen && (
                <div className="account-dropdown">
                  <div className="account-header">
                    <div className="avatar">
                      {username.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h4>{username}</h4>
                      <span>My Account</span>
                    </div>
                  </div>

                  <Link to={`/UserProfile/${user?.details.username}`}>
                    <FiUser />
                    Profile
                  </Link>

                  {isNurseryOwner && nurseryId && (
                    <>
                      <Link to={`/nursery/${nurseryId}`}>
                        <FaStore />
                        My Nursery
                      </Link>
                    </>
                  )}

                  {isNurseryOwner && !nurseryId && (
                    <Link to="/SetupNursery">
                      <FaStore />
                      Setup Nursery
                    </Link>
                  )}

                  {isNurseryOwner && (
                    <Link to="/AddProductControl">
                      <FaPlusCircle />
                      Add Product
                    </Link>
                  )}

                  <Link to="/orders">
                    <FiPackage />
                    Orders
                  </Link>

                  <Link to="/wishlist">
                    <FiHeart />
                    Wishlist
                  </Link>

                  <button className="logout-btn" onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link className="techsupport cart-button" to="/Cart">
              <RiShoppingBagLine className="techsupport-icon" />

              <p className="shoppingCartNumber">
                <span>{cart.quantity}</span>
              </p>
            </Link>

            <button
              className="hamburger-icon"
              onClick={() => setMenuOpen(true)}
              type="button"
            >
              <FiMenu />
            </button>
          </div>
        </div>

        <nav className="header-down" aria-label="Product categories">
          {categories.map((category) => (
            <Link to={`/category/${category}`} key={category}>
              {category} <FaCaretDown />
            </Link>
          ))}
        </nav>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <button
            className="closeheader"
            onClick={() => setMenuOpen(false)}
            type="button"
            aria-label="Close menu"
          >
            <FiX />
          </button>
          <div className="menu-content">
            <Link
              className="techsupport"
              to="/Home"
              onClick={() => setMenuOpen(false)}
            >
              <FaHome className="techsupport-icon" />
              <div>Home</div>
            </Link>
            <Link
              className="techsupport"
              to="/Cart"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart className="techsupport-icon" />
              <div>Cart</div>
            </Link>

            <div className="mobile-category-list">
              {categories.map((category) => (
                <Link
                  to={`/category/${category}`}
                  key={category}
                  onClick={() => setMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

