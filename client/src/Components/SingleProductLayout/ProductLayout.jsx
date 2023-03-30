import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import './ProductLayout.css'
import { useState } from "react";
import { FaHandHoldingWater, FaRuler, FaSun } from 'react-icons/fa'
import Carousel from 'react-multi-carousel';
import Product from '../Carousel/Product';
import { productData } from '../data';
import Footer from '../Footer/Footer';
import WriteReviewPopUp from './WriteReviewPopUp';
import '../data';
import useFetch from '../../hooks/useFetch';
import ReviewBox from './ReviewBox';
import { reviewData } from '../data';
import { addProduct } from '../../redux/slices/Cartslice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ProductLayout = (props) => {
    const user = useSelector((state) => state.user.currentUser);
    const productId = props.product
    const { data, loading } = useFetch(`/products/${productId}`);
    console.log(data.photos)
    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_gLhxxiLc3dxJM_G8ithy_6f_GMdbMUfHtGt7ga7o3dZwswdB1IGU0rROU9QWaETpQc&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEuIBum0MfyROhaNHceEGjnpngaOppcdmx2948DKDAtbekGZoDCEBIYuiuFCafv-yp7qQ&usqp=CAU",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61gCgvYeV4L._AC_SY606_.jpg",
        "https://www.ikea.com/in/en/images/products/fejka-artificial-potted-plant-with-pot-in-outdoor-succulent__0614211_pe686835_s5.jpg?f=s"
    ]
    //MainImg and 4 SmallImgs
    const [mainImgSrc, setMainImgSrc] = useState(images[3]);
    const handleSmallImgClick = (src) => {
        setMainImgSrc(src);
    };
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const product = productData.map((item) =>
        <Product name={item.name} key={item.id} url={item.imageurl} price={item.price} description={item.description} />
    )
    const review = reviewData.map((item) =>
        <ReviewBox key={item.id} url={item.url} name={item.name} datepost={item.datepost} review={item.review} />
    )
    const [buttonPopUp, setButtonPopUp] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1);
    const price = data.price
    const handleClick = () => {
        if (user) {
            dispatch(addProduct({ ...data, price, quantity }));
        } else {
            navigate("/Login")
        }
    };
    return (

        <div>

            <div className="outerLayout">

                <div className="imageProductLayout">
                    <div className="currentimage">
                        <img id="MainImg" src={mainImgSrc} />
                    </div>
                    <div className="passiveimage">
                        {
                            images.map((item, i) =>
                                <img id='small-img1' key={i} src={item} width={60} height={60} onClick={() => handleSmallImgClick(item)} />
                            )
                        }
                    </div>
                </div>

                <div className="infoProductLayout">
                    <div className="headingProduct">
                        <h1>{data.name}</h1>
                        <p>posted by {data.postedby}</p>
                    </div>
                    <div className="reviewsOfProduct">
                        <a onClick={() => setButtonPopUp(true)}> 3.9 / 5.0 | 146 reviews</a>
                    </div>
                    <div className="priceProduct">
                        <p>₹{data.price}</p>
                    </div>
                    <div className="descProduct">
                        <p>{data.desc}</p>
                    </div>
                    <div className="sizeProduct">
                        <div className="iconFeature">
                            <FaRuler />
                        </div>
                        <div className="descFeature">
                            <h4>Season: </h4>
                            <p>{data.season}</p>
                        </div>
                    </div>
                    <div className="sunlightProduct">
                        <div className="iconFeature">
                            <FaSun />
                        </div>
                        <div className="descFeature">
                            <h4>Sunnlight Requirement: </h4>
                            <p>indirect light</p>
                        </div>
                    </div>
                    <div className="waterProduct">
                        <div className="iconFeature">
                            <FaHandHoldingWater />
                        </div>
                        <div className="descFeature">
                            <h4>Water Frequency: </h4>
                            <p>25 x 50 cm</p>
                        </div>
                    </div>
                    <div className="buttonsProduct">
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            defaultValue={1}
                            className="dimenProduct"
                        />
                        <div className="cartProduct">
                            <button className="button btn-cart" onClick={handleClick}>
                                <span><span>Add to My Bag</span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="singleProductsubheading">
                <p className='horizontalLine'></p>
                <h3>YOU MAY ALSO LIKE</h3>
                <p className='horizontalLine'></p>
            </div>

            <Carousel
                responsive={responsive}
                slidesToSlide={2}
                draggable={true}
                swipeable={true}
            >
                {product}
            </Carousel>


            <div className="popupProduct">
                <div className="ratingPopUpProduct">
                    <div className="decimalratingPopupProduct">
                        <h3>4.4</h3>
                    </div>
                    <div className="starratingPopupProduct">
                        <h3>***STARS***</h3>
                    </div>
                    <div className="noOfreviewPopupProduct">
                        <h3>146 reviews</h3>
                    </div>
                </div>
                <div className="reviewsPopupProduct">
                    <div className="filterbuttonsPopupProduct">
                        <p>Sort by</p>
                        <div className="filterbuttonsPopup">
                            <button>Most Relevant</button>
                            <button>Newest</button>
                            <button>Highest</button>
                            <button>Lowest</button>
                        </div>
                    </div>
                    <div className="reviewsProduct">
                        {review}
                    </div>
                </div>
            </div>

            <WriteReviewPopUp trigger={buttonPopUp} setTrigger={setButtonPopUp}></WriteReviewPopUp>
            <Footer />
        </div>

    )
}

export default ProductLayout
