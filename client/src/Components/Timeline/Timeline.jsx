import React, { useState, useEffect } from "react";
import "./Timeline.css";

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([
    {
      id: 1,
      title: "STEP 1",
      description:
        "UrbanGarden offers Customer and Nursery seller interface. Customer can login or signup using the tabs given at the top of this webpage. Nursery seller has to click on 'Add a Nursery' from the TABs of this webpage.",
      show: false,
    },
    {
      id: 2,
      title: "STEP 2",
      description:
        "Customer can click on 'Shop Now' button to have a look on variety of products from 8 different cateegories. Customer can also have a look on Trending products, New Arriavls, Offers prevailing at the moment.",
      show: false,
    },
    {
      id: 3,
      title: "STEP 3",
      description:
        "Customer has to click on the 'Cart' icon in order to place his/her desired items in the UGCART, and have a look on the final invoice generated. SetUp the delivery address, mode of payment and proceed to checkout.",
      show: false,
    },
    {
      id: 4,
      title: "STEP 4",
      description:
        "Customer has to enter card credentials in case of UPI, Netbanking, etc. Complete the process and then click on Confirm.",
      show: false,
    },
    {
      id: 5,
      title: "STEP 5",
      description:
        "After the payment is processed, you should receive a confirmation email that your order has been received and message having a set of guidelines on how to handle the plants/items in order to set up a healthy environment for plant and yourself. Finally, you will receive your plants at your doorstep as per the delivery timeline mentioned in the confirmation email. ",
      show: false,
    },
  ]);

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [full, setFull] = useState(false);
  const [setVal, setSetVal] = useState(0);

  const scrollHandler = () => {
    const scrollY = window.scrollY;
    const targetY = window.innerHeight * 0.8;
    let prevScrollY = scrollY;
    let fullVal = full;
    let setValCopy = setVal;
    let upVal = up;
    let downVal = down;

    upVal = scrollY < prevScrollY;
    // downVal = !upVal;

    const timeline = document.querySelector(".timeline");
    const timelineRect = timeline.getBoundingClientRect();

    const line = document.querySelector(".line");
    const lineRect = line.getBoundingClientRect();

    const dist = targetY - timelineRect.top;

    if (downVal && !fullVal) {
      setValCopy = Math.max(setValCopy, dist);
      line.style.bottom = `calc(100% - ${setValCopy}px)`;
    }

    if (dist > timeline.offsetHeight + 50 && !fullVal) {
      fullVal = true;
      line.style.bottom = "-50px";
    }

    const sections = document.querySelectorAll(".section");

    sections.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top + item.offsetHeight / 5 < targetY) {
        item.classList.add("show-me");
      }
    });

    // prevScrollY = window.scrollY;

    // setUp(upVal);
    setDown(downVal);
    setFull(fullVal);
    setSetVal(setValCopy);
  };

  useEffect(() => {
    scrollHandler();
    const line = document.querySelector(".line");
    line.style.display = "block";
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="container">
      <div className="top-section">
        <h1>How it Works</h1>
        <p>
          Learn how to Order?
        </p>
      </div>
      <div className="timeline">
        <div className="line"></div>
        {timelineData.map((item) => (
          <div
            className={`section ${item.show ? "show-me" : ""}`}
            key={item.id}
            id={`section-${item.id}`}
          >
            <div className="bead"></div>
            <div className="content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
