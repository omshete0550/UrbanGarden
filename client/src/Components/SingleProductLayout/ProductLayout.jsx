import "./ProductLayout.css";
import { useEffect, useMemo, useState } from "react";
import { FaHandHoldingWater, FaRuler, FaStar, FaSun } from "react-icons/fa";
import Footer from "../Footer/Footer";
import WriteReviewPopUp from "./WriteReviewPopUp";
import ReviewBox from "./ReviewBox";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { reviewData } from "../data";
import { addProduct } from "../../redux/slices/Cartslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrendingSlider from "../../Components/Carousel/trendingSlider";

const ProductLayout = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const images = useMemo(() => props.image || [], [props.image]);
  const data = props.data;
  const [mainImgSrc, setMainImgSrc] = useState(null);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (images.length > 0) {
      setMainImgSrc(images[0]);
    }
  }, [images]);

  const review = reviewData.map((item) => (
    <ReviewBox
      key={item.id}
      url={item.url}
      name={item.name}
      datepost={item.datepost}
      review={item.review}
    />
  ));

  const handleClick = () => {
    if (user) {
      dispatch(addProduct({ ...data, price: data.price, quantity }));
    } else {
      navigate("/Login");
    }
  };

  return (
    <div>
      <div className="outerLayout">
        <div className="imageProductLayout">
          <div className="currentimage">
            <img id="MainImg" src={mainImgSrc} alt={data.name} />
          </div>
          <div className="passiveimage">
            {images.map((item, i) => (
              <button
                className={mainImgSrc === item ? "thumb active" : "thumb"}
                key={item}
                onClick={() => setMainImgSrc(item)}
                type="button"
              >
                <img src={item} alt={`${data.name} view ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="infoProductLayout">
          <div className="headingProduct">
            <p className="product-eyebrow">Urban Garden pick</p>
            <h1>{data.name}</h1>
            <p>Sold by {data.nurseryId}</p>
          </div>

          <div className="reviewsOfProduct">
            <button onClick={() => setButtonPopUp(true)} type="button">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span>4.0 rating</span>
            </button>
          </div>

          <div className="priceProduct">
            <p>Rs. {data.price}</p>
          </div>

          <div className="descProduct">
            <p>{(data.description || data.desc)}</p>
          </div>

          <div className="careGrid">
            <div className="careCard">
              <FaRuler />
              <div>
                <h4>Season</h4>
                <p>{data.season || "All seasons"}</p>
              </div>
            </div>
            <div className="careCard">
              <FaSun />
              <div>
                <h4>Sunlight</h4>
                <p>Indirect light</p>
              </div>
            </div>
            <div className="careCard">
              <FaHandHoldingWater />
              <div>
                <h4>Water</h4>
                <p>Moderate watering</p>
              </div>
            </div>
          </div>

          <div className="purchase-note">
            <strong>Fresh nursery dispatch</strong>
            <span>Care-packed delivery with support after purchase.</span>
          </div>

          <div className="buttonsProduct">
            <input
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              min="1"
              defaultValue={1}
              className="dimenProduct"
              aria-label="Quantity"
            />
            <div className="cartProduct">
              <button className="btn-cart" onClick={handleClick} type="button">
                Add to My Bag
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="singleProductsubheading">
        <p className="horizontalLine"></p>
        <h3>You may also like</h3>
        <p className="horizontalLine"></p>
      </div>

      <div className="SingleProductSlider">
        <TrendingSlider />
      </div>

      <section className="popupProduct">
        <div className="ratingPopUpProduct">
          <div className="decimalratingPopupProduct">
            <h3>4.0</h3>
          </div>
          <div className="starratingPopupProduct">
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Rating name="read-only" value={4} readOnly />
            </Box>
          </div>
          <div className="noOfreviewPopupProduct">
            <h3>146 reviews</h3>
          </div>
        </div>
        <div className="reviewsPopupProduct">
          <div className="filterbuttonsPopupProduct">
            <p>Sort by</p>
            <div className="filterbuttonsPopup">
              <button type="button">Most Relevant</button>
              <button type="button">Newest</button>
              <button type="button">Highest</button>
              <button type="button">Lowest</button>
            </div>
          </div>
          <div className="reviewsProduct">{review}</div>
        </div>
      </section>

      <WriteReviewPopUp
        trigger={buttonPopUp}
        setTrigger={setButtonPopUp}
      ></WriteReviewPopUp>
      <Footer />
    </div>
  );
};

export default ProductLayout;

