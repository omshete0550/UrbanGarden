import React from "react";
import Carousel from "react-multi-carousel";
import Product from "./Product";
import "react-multi-carousel/lib/styles.css";
import "./ProductSlider.css";
import useFetch from "../../hooks/useFetch";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TrendingSlider = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
    },
    miniDesktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { data, loading } = useFetch("/products/trending");
  const products = Array.isArray(data) ? data : [];
  const product = products.map((item) => (
    <Product
      name={item._id?.name}
      idx={item._id?.id}
      key={item._id?.id || item._id}
      url={item._id?.photos?.[0]}
      price={item._id?.price}
      description={item._id?.description || item._id?.desc}
    />
  ));

  return (
    <div className="parent">
      {loading ? (
        <SkeletonTheme baseColor="#fafafe" highlightColor="#eee">
          <div>
            <Skeleton count={1} height="18em" width="18em" />
            <div style={{ marginTop: "1em" }}>
              <Skeleton count={2} width={"18em"} />
            </div>
            <div style={{ marginTop: "3em" }}>
              <Skeleton count={1} width={"18em"} />
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        <Carousel
          responsive={responsive}
          slidesToSlide={1}
          draggable={true}
          swipeable={true}
        >
          {product}
        </Carousel>
      )}
    </div>
  );
};

export default TrendingSlider;
