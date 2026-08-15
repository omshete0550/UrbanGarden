import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import Service from "../../Components/Service/Service";
import CategoryBox from "../../Components/Category/CategoryBox";
import Footer from "../../Components/Footer/Footer";
import TrendingSlider from "../../Components/Carousel/trendingSlider";
import Timeline from "../../Components/Timeline/Timeline";
import UserSeller from "../../Components/UserSeller/UserSeller";
import "./LandingPage.css";
import "react-multi-carousel/lib/styles.css";
import { categoryData } from "../../Components/data";
import Review from "../../Components/Review/Review";
import { bestseller_small } from "../../assets";
import ContactUs from "../../Components/ContactUs/ContactUs";

const Header = () => {
  const category = categoryData.map((item) => (
    <CategoryBox title={item.title} key={item.id} content={item.content} />
  ));
  return (
    <>
      <Navbar />

      <Hero />

      <div className="category_section" id="categories">
        <h1>CATEGORIES TO BAG</h1>
        <main className="page-content">{category}</main>
      </div>

      <div className="bestPicks">
        <h2 className="carouselheading">
          <img src={bestseller_small} alt="" />
          Your Best Picks
        </h2>
        <TrendingSlider />
      </div>

      <Timeline />

      <div id="whyug">
        <Service />
      </div>

      <Review />

      <UserSeller />

      <ContactUs />

      <Footer />
    </>
  );
};

export default Header;
