import React from "react";
import { Fade } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { testimonials } from "../../data/reviewData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./review.css";
import { quote } from "../../assets";

const Reviews = () => {
  return (
    <>
      <Fade duration="2000" direction="up" triggerOnce>
        <section className="testimony_content_homepage">
          <div className="testimony_container">
            <div className="testimony_info">
              <div className="testimony_title">
                <h1>WHAT OUR CLIENTS SAY</h1>
              </div>
              <img src={quote} alt="quote"></img>

              <div className="testimony_map">
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={1}
                  spaceBetween={20}
                  navigation={{
                    prevEl: " .leftarrowimg",
                    nextEl: " .rightarrowimg",
                  }}
                  autoHeight={true}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                >
                  {testimonials.map((data, i) => (
                    <SwiperSlide key={i}>
                      <div className="testimony_data">
                        <div className="text">
                          <div className="testimony_description">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                            ></p>
                          </div>
                        </div>

                        <div className="seperator">
                          <div className="horizontal_line"></div>
                        </div>

                        <div className="client_name">
                          <h6>{data.clientname}</h6>
                          <p>{data.role}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </Fade>
    </>
  );
};

export default Reviews;
