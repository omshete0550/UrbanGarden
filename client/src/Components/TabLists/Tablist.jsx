import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaStar, FaTimes } from "react-icons/fa";
import Product from "../Carousel/Product";
import "./Tablist.css";
import CustomImageList from "../ImageList/CustomImageList";
import SingleNurRevBox from "../SingleNurRevBox/SingleNurRevBox";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../lib/apiBase";

const tabs = ["Overview", "Other Products", "Reviews", "Photos"];

export default function Tablist({ data = {} }) {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const location = useLocation();
  const nurseryId = location.pathname.split("/")[2];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/nurseries/${nurseryId}/products`,
        );
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch {
        setProducts([]);
      }
    };
    if (nurseryId) getProducts();
  }, [nurseryId]);

  return (
    <section className="horzTablistcont">
      <div className="nurseryTabs">
        <div className="tabNav" role="tablist" aria-label="Nursery sections">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              role="tab"
              aria-selected={value === index}
              className={`tabButton ${value === index ? "active" : ""}`}
              onClick={() => setValue(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tabPanel">
          {value === 0 && (
            <div className="SingleNurOverview">
              <div className="sectionHeading">
                <span>01</span>
                <div>
                  <p>Inside the nursery</p>
                  <h2>About this nursery</h2>
                </div>
              </div>
              <div className="overviewGrid">
                <div className="overviewCard">
                  <h3>Categories</h3>
                  <div className="SpeCategBtn">
                    <button>Gardening</button>
                    <button>Pebbbles</button>
                    <button>Pots</button>
                  </div>
                </div>
                <div className="overviewCard nurseryPriceCard">
                  <h3>Minimum Cost</h3>
                  <strong>Rs. {data.leastPrice || 100}</strong>
                  <span>per plant (approx.)</span>
                  <p>Exclusive of applicable taxes and charges, if any.</p>
                </div>
              </div>
              <div className="moreInfo">
                <div className="sectionHeading compact">
                  <span>02</span>
                  <div>
                    <p>What we offer</p>
                    <h2>More Info</h2>
                  </div>
                </div>
                <div className="Info">
                  {[
                    "Home Delivery",
                    "Quality Plants",
                    "Garden Supplies",
                    "Easy Ordering",
                  ].map((item) => (
                    <div className="infoPill" key={item}>
                      <FaCheckCircle />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {value === 1 && (
            <div className="SingleNurOrder">
              <div className="sectionHeading">
                <span>01</span>
                <div>
                  <p>Browse our collection</p>
                  <h2>Our Products</h2>
                </div>
              </div>
              <div className="parentGrid1">
                {products.length ? (
                  products.map((item) => (
                    <Product
                      key={item._id}
                      name={item.name}
                      url={item.photos?.[0]}
                      price={item.price}
                      description={item.description || item.desc}
                      idx={item._id}
                    />
                  ))
                ) : (
                  <div className="emptyState">No products available yet.</div>
                )}
              </div>
            </div>
          )}

          {value === 2 && (
            <div className="SingleNurReview">
              <div className="reviewHeader">
                <div className="sectionHeading">
                  <span>01</span>
                  <div>
                    <p>Customer feedback</p>
                    <h2>Reviews</h2>
                  </div>
                </div>
                <button
                  className="writeReviewBtn"
                  onClick={() => setPopup(true)}
                >
                  WRITE A REVIEW
                </button>
              </div>
              {popup && (
                <div className="popup-main">
                  <div className="reviewPopup">
                    <button
                      className="closecircleXmark"
                      onClick={() => setPopup(false)}
                      aria-label="Close"
                    >
                      <FaTimes />
                    </button>
                    <div className="topwrite">
                      <span>Share your experience</span>
                      <h2>{data.name || "Nursery"}</h2>
                    </div>
                    <div className="identitylabel">
                      <div className="identityicon">IC</div>
                      <div className="identitydetails">
                        <h3>Hamza Ali Sayed</h3>
                        <p>Post Publicly</p>
                      </div>
                    </div>
                    <div className="reviewStars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={star <= reviewRating ? "selected" : ""}
                          onClick={() => setReviewRating(star)}
                          aria-label={`${star} star`}
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="typereview"
                      placeholder="Tell us about your experience..."
                      rows="6"
                    />
                    <div className="writereviewbuttons">
                      <button
                        className="cancelReviewBtn"
                        onClick={() => setPopup(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="postReviewBtn"
                        onClick={() => setPopup(false)}
                      >
                        POST
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="reviewsList">
                <SingleNurRevBox />
                <SingleNurRevBox />
                <SingleNurRevBox />
              </div>
            </div>
          )}

          {value === 3 && (
            <div className="SingleNurPhoto">
              <div className="sectionHeading">
                <span>01</span>
                <div>
                  <p>Explore the space</p>
                  <h2>{data.name || "Nursery"} Photos</h2>
                </div>
              </div>
              <CustomImageList photos={data.photos} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
