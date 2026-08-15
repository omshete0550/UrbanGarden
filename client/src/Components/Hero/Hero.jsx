import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { textVariants, fadeIn } from "../../motion";
import { heroMain, floatingHero, hero } from "../../assets";

const heroData = {
  content: "Planting Success, One Click Away.",
};

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="left_hero">
          <motion.h3
            variants={textVariants("left", 0.2, 2.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            Best Choice
          </motion.h3>
          <h1>
            <TypeAnimation
              sequence={[
                heroData.content,
                5000,
                heroData.content,
                5000,
                heroData.content,
                5000,
                heroData.content,
                5000,
              ]}
              speed={1}
              deletionSpeed={99}
              repeat={Infinity}
            />
          </h1>
          <motion.p
            variants={textVariants("left", 0.2, 2.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            Discover the Ultimate Convenience in Setting Up Your Online Nursery
            Store. Empower Your Customers with Seamless Navigation, Detailed
            Plant Information, and Effortless Purchases. Maximize Sales and
            Satisfaction in the Growing Market of Plants and Gardening Supplies!
          </motion.p>
          <motion.p
            variants={textVariants("left", 0.2, 2.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="hero-note"
          >
            Start with trending products or jump to categories to find the items
            you need faster.
          </motion.p>
          <motion.div
            variants={textVariants("left", 0.2, 2.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="buttons"
          >
            <Link to="/Home">
              <button className="button-91" aria-label="Shop trending products">
                Shop Trending
              </button>
            </Link>
            <a
              href="#categories"
              className="button-91"
              aria-label="Browse product categories"
            >
              Browse Categories
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="right_hero"
        >
          <img src={heroMain} alt="" />
        </motion.div>
        <div className="FloatingHero">
          <img src={floatingHero} alt="" />
        </div>
        <div className="FloatingHeroProductCard">
          <img src={hero} alt="" />
          <div>
            <h3>Mapple Tree</h3>
            <div className="priceDiv">
              <p>₹. 154.30</p>
              <i>
                <IoIosAdd size={20} color="white" />
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
