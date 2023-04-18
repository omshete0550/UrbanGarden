import React, { useState } from "react";
import { FaAddressBook, FaCaretDown, FaSearch, FaShoppingCart } from 'react-icons/fa'
import './Header.css';
import logo from '../../UGbg.png';
import PopupBtn from '../../Components/PopupButton/PopoverPopupState'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const [Search, setSearch] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  function handleClick() {
    navigate("/");
  }
  function handleClick1() {
    navigate("/Cart");
  }
  async function handleClick2() {
    const res = await axios.get(`/products/username/${Search}`)
    navigate(`Products/${res.data[0]._id}`)
  }

  return (
    <div>
      <div className="header">

        <div className="header-up">
          <div className="logo-div" onClick={handleClick}>
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
              <input type="text"
                className="searchbar"
                placeholder="What are you looking for?"
                onChange={(e) => setSearch(e.target.value)}
                required></input>
              <div className="searchicon" onClick={handleClick2}>
                <FaSearch className="search-icon" />
              </div>
            </div>
          </div>
          <div className="buttons-div">
            <div className="techsupport">
              <FaAddressBook className="techsupport-icon" />
              <div>Expert Support</div>
            </div>
            <div className="techsupport" style={{ padding: "20px 20px", fontSize: "1rem" }}>
              <div><PopupBtn /></div>
            </div>
            <div className="techsupport" onClick={handleClick1}>
              <FaShoppingCart className="techsupport-icon" />
              <p className="shoppingCartNumber"><span>{cart.quantity}</span></p>
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
