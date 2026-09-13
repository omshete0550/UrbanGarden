import "./ProductLayout.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCheck,
  FaHandHoldingWater,
  FaRuler,
  FaStar,
  FaSun,
} from "react-icons/fa";
import Footer from "../Footer/Footer";
import ReviewBox from "./ReviewBox";
import { addProduct } from "../../redux/slices/Cartslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrendingSlider from "../../Components/Carousel/trendingSlider";

const ProductLayout = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const images = useMemo(
    () => (Array.isArray(props.image) ? props.image : []),
    [props.image]
  );
  const data = props.data;
  const [mainImgSrc, setMainImgSrc] = useState(null);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addFeedbackTimeout = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (images.length > 0) {
      setMainImgSrc(images[0]);
      setImageUnavailable(false);
    } else {
      setMainImgSrc(null);
      setImageUnavailable(true);
    }
  }, [images]);

  useEffect(
    () => () => window.clearTimeout(addFeedbackTimeout.current),
    [],
  );

  const rating = Number(data.rating) || 0;
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];
  const review = reviews.map((item, index) => (
    <ReviewBox
      key={item._id || `${item.reviewBy || item.reviewby || "review"}-${index}`}
      name={item.reviewBy || item.reviewby || "Customer"}
      rating={item.rated}
      review={item.review}
    />
  ));

  const handleClick = () => {
    if (user) {
      dispatch(addProduct({ ...data, price: data.price, quantity }));
      setAddedToCart(true);
      window.clearTimeout(addFeedbackTimeout.current);
      addFeedbackTimeout.current = window.setTimeout(
        () => setAddedToCart(false),
        1800,
      );
    } else {
      navigate("/Login");
    }
  };

  return (
    <div>
      <div className="outerLayout">
        <div className="imageProductLayout">
          <div className="currentimage">
            {mainImgSrc && !imageUnavailable ? (
              <img
                id="MainImg"
                src={mainImgSrc}
                alt={data.name || "Product image"}
                onError={() => setImageUnavailable(true)}
              />
            ) : (
              <div className="imageFallback">Product image unavailable</div>
            )}
          </div>
          <div className="passiveimage">
            {images.map((item, i) => (
              <button
                className={mainImgSrc === item ? "thumb active" : "thumb"}
                key={item}
                onClick={() => {
                  setMainImgSrc(item);
                  setImageUnavailable(false);
                }}
                type="button"
              >
                <img src={item} alt={`${data.name} view ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="infoProductLayout">
          <div className="headingProduct">
            <p className="product-eyebrow">Product details</p>
            <h1>{data.name}</h1>
            <p>Sold by {data.nurseryId}</p>
          </div>

          <div className="reviewsOfProduct">
            {rating > 0 ? (
              <div className="ratingStatus" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
                <FaStar aria-hidden="true" />
                <span>{rating.toFixed(1)} rating</span>
                <small>{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</small>
              </div>
            ) : (
              <span className="noRating">No customer ratings yet</span>
            )}
          </div>

          <div className="priceProduct">
            <p>Rs. {data.price}</p>
          </div>

          <div className="descProduct">
            <p>{data.description || data.desc || "Product details are not available for this listing."}</p>
          </div>

          <div className="careGrid">
            <div className="careCard">
              <FaRuler />
              <div>
                <h4>Season</h4>
                <p>{data.season || "Not specified"}</p>
              </div>
            </div>
            <div className="careCard">
              <FaSun />
              <div>
                <h4>Sunlight</h4>
                <p>{data.sunlight || "Not specified"}</p>
              </div>
            </div>
            <div className="careCard">
              <FaHandHoldingWater />
              <div>
                <h4>Water</h4>
                <p>{data.water || "Not specified"}</p>
              </div>
            </div>
          </div>

          <div className="purchase-note">
            <strong>{data.nurseryId ? `Listed by ${data.nurseryId}` : "Nursery information unavailable"}</strong>
            <span>Contact the nursery for availability and delivery information.</span>
          </div>

          <div className="buttonsProduct">
            <input
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              type="number"
              min="1"
              value={quantity}
              className="dimenProduct"
              aria-label="Quantity"
            />
            <div className="cartProduct">
              <button
                className={`btn-cart ${addedToCart ? "added" : ""}`}
                onClick={handleClick}
                type="button"
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <FaCheck aria-hidden="true" />
                    Added to cart
                  </>
                ) : (
                  "Add to My Bag"
                )}
              </button>
              <span className={`cartFeedback ${addedToCart ? "visible" : ""}`} role="status">
                Item added to your cart
              </span>
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

      <section className="popupProduct" aria-labelledby="product-reviews-title">
        <div className="ratingPopUpProduct">
          <div className="decimalratingPopupProduct">
            <h3>{rating > 0 ? rating.toFixed(1) : "—"}</h3>
          </div>
          <div className="noOfreviewPopupProduct">
            <h3 id="product-reviews-title">
              {reviews.length
                ? `${reviews.length} customer ${reviews.length === 1 ? "review" : "reviews"}`
                : "No customer reviews yet"}
            </h3>
          </div>
        </div>
        <div className="reviewsPopupProduct">
          <div className="reviewsProduct">
            {review.length ? review : <p className="reviewsEmpty">Reviews from customers will appear here.</p>}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductLayout;

