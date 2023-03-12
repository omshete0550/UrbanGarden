import React from "react";
import { FaAddressBook, FaCaretDown, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'
import './Header.css';
import logo from '../../UGbg.png';

const Header = () => {

  return (
    <div>
      <div className="header">

        <div className="header-up">
          <div className="logo-div">
            <img src={logo} width="80" height="80"></img>
            <h1 style={{ color: "#00743c" }}>Urban <br></br> Garden</h1>
          </div>
          <div className="search-div">
            <div className="all-categories">
              <select name="categories" id="categories">
                <option value="Categories">Categories</option>
                <option value="Gardening">Gardening</option>
                <option value="Plants">Plants</option>
                <option value="Seeds">Seeds</option>
                <option value="Soil">Soil</option>
                <option value="Fertilizers">Fertilizers</option>
              </select>
            </div>
            <div className="search-bar">
              <input type="text" className="searchbar" placeholder="What are you looking for?" required></input>
              <div className="searchicon">
                <FaSearch className="search-icon" />
              </div>
            </div>
          </div>
          <div className="buttons-div">
            <div className="techsupport">
              <FaAddressBook className="techsupport-icon" />
              <div>Expert Support<br></br><i>Available 24/7</i></div>
            </div>
            <div className="techsupport" style={{ padding: "20px 20px", fontSize: "1rem" }}>
              <FaUser className="techsupport-icon" style={{ fontSize: "1.7rem" }} />
              <div>Login</div>
            </div>
            <div className="techsupport">
              <FaShoppingCart className="techsupport-icon" />

            </div>
          </div>
        </div>

        <div className="header-down">
          <a href="#" className="">Gardening <FaCaretDown /></a>
          <a href="#" className="">Plants <FaCaretDown /></a>
          <a href="#" className="">Seeds <FaCaretDown /></a>
          <a href="#" className="">Bulbs <FaCaretDown /></a>
          <a href="#" className="">Pots <FaCaretDown /></a>
          <a href="#" className="">Planters <FaCaretDown /></a>
          <a href="#" className="">Soil & Fertilizer <FaCaretDown /></a>
          <a href="#" className="">Pebbbles <FaCaretDown /></a>
          <a href="#" className="">Accessories <FaCaretDown /></a>

        </div>
      </div>
    </div>
  );
};

export default Header;
