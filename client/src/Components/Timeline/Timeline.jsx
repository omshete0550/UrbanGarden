import React from "react";
import "./Timeline.css";
import {
  FaUserPlus,
  FaSeedling,
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: <FaUserPlus />,
    title: "Create Your Account",
    description:
      "Sign up as a customer and start exploring UrbanGarden. Nursery sellers can register their nursery and showcase their products.",
  },
  {
    number: "02",
    icon: <FaSeedling />,
    title: "Explore & Shop",
    description:
      "Discover plants, gardening supplies, trending products, new arrivals and exciting offers across multiple categories.",
  },
  {
    number: "03",
    icon: <FaShoppingCart />,
    title: "Build Your Cart",
    description:
      "Choose your favourite plants and gardening products, add them to your cart and review your order before checkout.",
  },
  {
    number: "04",
    icon: <FaCreditCard />,
    title: "Checkout Securely",
    description:
      "Enter your delivery address, choose your preferred payment method and securely complete your purchase.",
  },
  {
    number: "05",
    icon: <FaTruck />,
    title: "Grow at Home",
    description:
      "Your plants arrive at your doorstep. Follow the provided care guidelines and start creating your own green space.",
  },
];

const Timeline = () => {
  return (
    <section className="plantJourney" id="howtouse">
      <div className="plantJourneyHeader">
        <span className="sectionTag">SIMPLE. GREEN. CONVENIENT.</span>

        <h1>
          Your Journey from
          <span> Nursery to Home</span>
        </h1>

        <p>
          Getting your favourite plants delivered to your doorstep is easier
          than ever.
        </p>
      </div>

      <div className="journeySteps">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="journeyStep">
              <div className="stepNumber">{step.number}</div>

              <div className="stepIcon">{step.icon}</div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>

            {index !== steps.length - 1 && (
              <div className="journeyConnector">
                <span>→</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
