import React from "react";
import "./Hero.css";
import "./animation.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero" data-aos="zoom-in">
        <div className="left_hero">
          <h3>#ORNAMENTAL PLANT</h3>
          <h1>
            Various Indoor <br /> Plant Shop
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, iusto
            molestias ducimus alias suscipit aspernatur.
          </p>
          <div className="buttons">
            <Link to="/Home">
              <button className="button-91">Shop Now</button>
            </Link>
            <button className="button-91">Learn More</button>
          </div>
        </div>

        <div className="right_hero">
          <img src="https://media1.giphy.com/media/gbRv5aZzi8UJAL5VH6/giphy.gif?cid=6c09b952nztq328zz8cixurqel53kqubbr2vjo1iuq52iz92&ep=v1_stickers_related&rid=giphy.gif&ct=s" alt="" />
          {/* <div class="flowercontainer">
            <div class="sun">
              <div class="sunrays"></div>
              <div class="circle"></div>
            </div>
            <div class="shadow"></div>
            <div class="pot"></div>
            <div class="water-jar"></div>
            <div class="water"></div>
            <div class="flower">
              <div class="stem"></div>
              <div class="leaf"></div>
              <div class="petal petal-1"></div>
              <div class="petal petal-2"></div>
              <div class="petal petal-3"></div>
              <div class="petal petal-4"></div>
              <div class="petal petal-5"></div>
              <div class="petal petal-6"></div>
              <div class="dot"></div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Hero;
