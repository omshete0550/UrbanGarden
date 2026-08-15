import React from "react";
import { Fade } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

import { testimonials } from "../../data/reviewData";

import "swiper/css";
import "swiper/css/navigation";
import "./review.css";

const Reviews = () => {
  return (
    <Fade duration={1200} direction="up" triggerOnce>
      <section className="reviewsSection">
        <div className="reviewsDecor reviewsDecorOne"></div>
        <div className="reviewsDecor reviewsDecorTwo"></div>

        <div className="reviewsHeader">
          <span className="reviewsTag">FROM OUR COMMUNITY</span>

          <h1>
            What Our <span>Gardeners</span> Say
          </h1>

          <p>
            Real experiences from people growing their little green spaces with
            UrbanGarden.
          </p>
        </div>

        <div className="reviewsContainer">
          <div className="quoteIcon">
            <FaQuoteLeft />
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoHeight={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".reviewPrev",
              nextEl: ".reviewNext",
            }}
            className="reviewsSwiper"
          >
            {testimonials.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="reviewCard">
                  <div className="reviewDescription">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    />
                  </div>

                  <div className="reviewDivider"></div>

                  <div className="reviewClient">
                    <div className="clientAvatar">
                      {data.clientname?.charAt(0)}
                    </div>

                    <div>
                      <h3>{data.clientname}</h3>
                      {data.role && <p>{data.role}</p>}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="reviewNavigation">
            <button className="reviewPrev" aria-label="Previous testimonial">
              <FaArrowLeft />
            </button>

            <div className="reviewLine"></div>

            <button className="reviewNext" aria-label="Next testimonial">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default Reviews;
