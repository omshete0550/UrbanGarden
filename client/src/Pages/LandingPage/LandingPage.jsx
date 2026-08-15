import React from "react";

import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import Service from "../../Components/Service/Service";
import CategoryBox from "../../Components/Category/CategoryBox";
import Footer from "../../Components/Footer/Footer";
import TrendingSlider from "../../Components/Carousel/trendingSlider";
import Timeline from "../../Components/Timeline/Timeline";
import UserSeller from "../../Components/UserSeller/UserSeller";
import Review from "../../Components/Review/Review";

import "./LandingPage.css";
import "react-multi-carousel/lib/styles.css";

import { categoryData } from "../../Components/data";

const Header = () => {
  const category = categoryData.map((item) => (
    <CategoryBox title={item.title} key={item.id} content={item.content} />
  ));

  return (
    <>
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Categories */}
      <section className="category_section" id="categories">
        <div className="sectionIntro">
          <span>EXPLORE OUR GARDEN</span>

          <h2>
            Find Something to <strong>Grow</strong>
          </h2>

          <p>
            Explore plants, gardening essentials and everything you need to
            create your perfect green space.
          </p>
        </div>

        <main className="page-content">{category}</main>
      </section>

      {/* Best Picks */}
      <section className="bestPicks" id="bestpicks">
        <div className="bestPicksHeader">
          <div>
            <span>HANDPICKED FOR YOU</span>

            <h2>
              Picked for Your <strong>Garden</strong>
            </h2>
          </div>

          <button className="viewAllButton">
            View All <span>→</span>
          </button>
        </div>

        <TrendingSlider />
      </section>

      {/* Why UrbanGarden */}
      <div id="whyug">
        <Service />
      </div>

      {/* How UrbanGarden Works */}
      <Timeline />

      {/* Reviews */}
      <Review />

      {/* Customers & Nursery Sellers */}
      <UserSeller />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Header;
