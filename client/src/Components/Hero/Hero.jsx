import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <div className="hero" data-aos="zoom-in">
        <div className="left_hero">
          <h3>#ORNAMENTAL PLANT</h3>
          <h1>Various Indoor <br /> Plant Shop</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, iusto molestias ducimus alias suscipit aspernatur.</p>
          <div className="buttons">
            <Link to='/Home'>
              <button className="button-91">Shop Now</button>
            </Link>
            <button className="button-91">Learn More</button>


          </div>
        </div>

        <div className="right_hero" >
          <img src="https://media1.giphy.com/media/gbRv5aZzi8UJAL5VH6/giphy.gif?cid=6c09b952nztq328zz8cixurqel53kqubbr2vjo1iuq52iz92&ep=v1_stickers_related&rid=giphy.gif&ct=s" alt="" />
        </div>
      </div>
    </>
  )
}

export default Hero