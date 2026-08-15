import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Timeline.css";
import { FaHome } from "react-icons/fa";

const Timeline = () => {
  return (
    <>
      <div className="timeCont" id="howtouse">
        <h1>How to Use?</h1>

        <VerticalTimeline animate={true} lineColor="#0d3824">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "none",
              color: "#fff",
              boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #61b76e" }}
            iconStyle={{ background: "none", color: "#fff" }}
            icon={<FaHome />}
          >
            <p>
              UrbanGarden offers Customer and Nursery seller interface. Customer
              can login or signup using the tabs given at the top of this
              webpage. Nursery seller has to click on 'Add a Nursery' from the
              TABs of this webpage.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "none",
              color: "#fff",
              boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #61b76e" }}
            iconStyle={{ background: "none", color: "#fff" }}
            icon={<FaHome />}
          >
            <p>
              Customer can click on 'Shop Now' button to have a look on variety
              of products from 8 different cateegories. Customer can also have a
              look on Trending products, New Arriavls, Offers prevailing at the
              moment.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "none",
              color: "#fff",
              boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #61b76e" }}
            iconStyle={{ background: "none", color: "#fff" }}
            icon={<FaHome />}
          >
            <p>
              Customer has to click on the 'Cart' icon in order to place his/her
              desired items in the UGCART, and have a look on the final invoice
              generated. SetUp the delivery address, mode of payment and proceed
              to checkout.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "none",
              color: "#fff",
              boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #61b76e" }}
            iconStyle={{ background: "none", color: "#fff" }}
            icon={<FaHome />}
          >
            <p>
              Customer has to enter card credentials in case of UPI, Netbanking,
              etc. Complete the process and then click on Confirm.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "none",
              color: "#fff",
              boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #61b76e" }}
            iconStyle={{ background: "none", color: "#fff" }}
            icon={<FaHome />}
          >
            <p>
              After the payment is processed, you should receive a confirmation
              email that your order has been received and message having a set
              of guidelines on how to handle the plants/items in order to set up
              a healthy environment for plant and yourself. Finally, you will
              receive your plants at your doorstep as per the delivery timeline
              mentioned in the confirmation email.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

export default Timeline;
