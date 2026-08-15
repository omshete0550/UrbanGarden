import React from "react";
import Header from "../../Components/Header/Header";
import TrendingSlider from "../../Components/Carousel/trendingSlider";
import GardeningSlider from "../../Components/Carousel/gardeningSlider";
import PlantSlider from "../../Components/Carousel/plantSlider";
import OfferSlider from "../../Components/Carousel/OfferSlider";
import BulbSlider from "../../Components/Carousel/bulbSlider";
import PebbleSlider from "../../Components/Carousel/pebbleSlider";
import PotSlider from "../../Components/Carousel/potSlider";
import SeedSlider from "../../Components/Carousel/seedSlider";
import AccessorySlider from "../../Components/Carousel/accessorySlider";
import SoilAndFertilizerSlider from "../../Components/Carousel/soilfertSlider";
import SliderSection from "../../Components/SliderSection/SliderSection";
import CategoryBox from "../../Components/Category/CategoryBox";
import Footer from "../../Components/Footer/Footer";
import { categoryData } from "../../Components/data";
import "./Home.css";
const HomePage = () => {
  const category = categoryData.map((item) => (
    <CategoryBox title={item.title} key={item.id} content={item.content} />
  ));

  const productSections = [
    { title: "GARDENING", Component: GardeningSlider },
    { title: "PLANTS", Component: PlantSlider },
    { title: "SEEDS", Component: SeedSlider },
    { title: "BULBS", Component: BulbSlider },
    { title: "POTS", Component: PotSlider },
    { title: "SOIL & FERTILIZER", Component: SoilAndFertilizerSlider },
    { title: "PEBBLES", Component: PebbleSlider },
    { title: "ACCESSORIES", Component: AccessorySlider },
  ];

  return (
    <div>
      <Header />

      <OfferSlider />

      <SliderSection title="TRENDING" Component={TrendingSlider} />

      <div className="category_section">
        <h1>CATEGORIES TO BAG</h1>
        <main className="page-content">{category}</main>
      </div>

      {productSections.map((section) => (
        <SliderSection
          key={section.title}
          title={section.title}
          Component={section.Component}
        />
      ))}

      <Footer />
    </div>
  );
};

export default HomePage;
