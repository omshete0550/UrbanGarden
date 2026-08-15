import React from "react";
import Product from "../Carousel/Product";
import { FaAngleDoubleRight } from "react-icons/fa";
import "./GridCateg.css";
import useFetch from "../../hooks/useFetch";

const GridCateg = (props) => {
  const category = props.gridheading;
  const { data, loading } = useFetch(`/products?category=${category}`);

  return (
    <section className="gridCategSection">
      <div className="gridHeader">
        <div>
          <p>Shop by category</p>
          <h1 className="gridheading">
            {category} <FaAngleDoubleRight />
          </h1>
        </div>
        <select aria-label="Sort products">
          <option>Featured</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
          <option>Newest</option>
        </select>
      </div>

      {loading ? (
        <div className="grid-loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : data?.length ? (
        <div className="parentGrid">
          {data.map((item) => (
            <Product
              name={item.name}
              url={item.photos?.[0]}
              key={item._id}
              price={item.price}
              description={item.desc}
              idx={item._id}
            />
          ))}
        </div>
      ) : (
        <div className="emptyGrid">
          <h2>No products found</h2>
          <p>Try clearing filters or browsing another garden category.</p>
        </div>
      )}
    </section>
  );
};

export default GridCateg;
