import React from 'react';
import Header from '../../Components/Header/Header'
import ProductSlider from '../../Components/Carousel/ProductSlider';
import OfferSlider from '../../Components/Carousel/OfferSlider';
import CategoryBox from '../../Components/Category/CategoryBox';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { categoryData } from '../../Components/data';
import useFetch from "../../hooks/useFetch";

const HomePage = () => {
  const mystyle = {
    alignItems: "center",
    justifyContent: "center",
    padding: "0px 0 0 40px",
    fontSize: "1.8rem"
  };
  const category = categoryData.map((item) =>
    <CategoryBox title={item.title} key={item.id} content={item.content} />
  )
  const { data, loading, error } = useFetch("/products");

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* NAVBAR  */}
      <Header />
      {/* NAVBAR  */}

      {/* OFFERSLIDER  */}
      <OfferSlider />
      {/* OFFERSLIDER  */}

      {/* TRENDING  */}

      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={mystyle}>TRENDING <FaAngleDoubleRight style={{ paddingTop: "8px" }} /> </h2>
        <ProductSlider data={data} />
      </div>
      {/* TRENDING  */}

      {/* NEW_ARRIVALS  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>NEW ARRIVALS <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* NEW_ARRIVALS  */}

      {/* Map-Category  */}
      <div className="category_section" >
        <h1>CATEGORIES TO BAG</h1>
        <main className="page-content">
          {category}
        </main>
      </div>
      {/* Map-Category  */}

      {/* GARDENING  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>GARDENING <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* GARDENING  */}

      {/* PLANTS  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>PLANTS <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* PLANTS  */}

      {/* SEEDS  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>SEEDS <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* SEEDS  */}

      {/* BULBS  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>BULBS <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* BULBS  */}

      {/* POTS  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>POTS <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* POTS  */}

      {/* SOIL & FERTILIZERS  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>SOIL & FERTILIZER <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* SOIL & FERTILIZER  */}

      {/* PEBBLES  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>PEBBLES <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* PEBBLES  */}

      {/* ACCESSORIES  */}
      <div className="Bestsellers" style={{ textAlign: "left", padding: "5px 0 0 0" }}>
        <h2 style={{ padding: "0px 0 0 40px", fontSize: "1.8rem" }}>ACCESSORIES <FaAngleDoubleRight style={{ paddingTop: "8px" }} /></h2>
        <ProductSlider data={data} />
      </div>
      {/* ACCESSORIES  */}

      {/* Footer  */}
      <Footer />
      {/* Footer  */}
    </div>

  );
}

export default HomePage