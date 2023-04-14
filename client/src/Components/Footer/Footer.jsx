import React from 'react'
import "./FooterStyles.css";
import {
  FaArrowAltCircleRight,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import log from '../../UGbg.png'


const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="brand">
            <div className="brandlogo">
              <img src={log} alt="" width={140} height={140} />
            </div>
            <div className="brandname">
              Urban
              <br /> Garden
            </div>
          </div>
          <div className="field">
            <div className="tagline">
              <h2>
                <i>#TAGLINE</i>
              </h2>
            </div>
            <div className="headingfield">
              <h2>STAY CONNECTED </h2>
            </div>
            <div className="form__group field">
              <div className="combine">
                <input
                  required=""
                  placeholder="Name"
                  className="form__field"
                  type="input"
                />
                <label className="form__label" htmlFor="name">
                  Query
                </label>
              </div>
              <div className="submit">
                <button className='buttonn'>
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="branddesc">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Inventore exercitationem eum dolores beatae aut quisquam qui odit
              laboriosam consectetur nihil! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, iure!
            </p>
          </div>
          <div className="menulist">
            <div className="list">
                <a href="">About Us</a>
                <a href="">Categories</a>
                <a href="">How to Trade</a>
                <a href="">Contact Us</a>    
            </div>
            <div className="list">
                <a href="">Gardening</a>
                <a href="">Plants</a>
                <a href="">Seeds</a>
                <a href="">Bulbs</a>  
            </div>
            <div className="list">
                <a href="">Pots</a>
                <a href="">Pebbles</a>
                <a href="">Soil & Fertlizer</a>
                <a href="">Accessories</a>  
            </div>
          </div>
          <div className="subscribe">
          <h1>Get in Touch</h1>
          <div className="icons">
                <FaFacebook/>
                <FaTwitter/>
                <FaInstagram/>
                <FaGithub/>
                </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
