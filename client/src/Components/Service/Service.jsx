import React from "react";
import "./Service.css";
import { FaRecycle, FaShieldAlt, FaTags, FaTint } from "react-icons/fa";

const services = [
  {
    icon: <FaRecycle />,
    title: "Plant care details",
    description:
      "Review season, light, and watering information before placing an order.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Nursery listings",
    description:
      "Compare products and listing details from participating nurseries.",
  },
  {
    icon: <FaTags />,
    title: "Clear product pricing",
    description:
      "Review item prices and order totals before you continue to checkout.",
  },
  {
    icon: <FaTint />,
    title: "Account tools",
    description:
      "Keep delivery addresses and previous orders organised in your account.",
  },
];

const Service = () => {
  return (
    <section className="serviceSection">
      <div className="serviceHeader">
        <span className="serviceTag">WHY CHOOSE US</span>

        <h1>
          Why <span>UrbanGarden?</span>
        </h1>

        <p>
          We make bringing nature into your space simple, convenient and
          enjoyable.
        </p>
      </div>

      <div className="services_container">
        {services.map((service, index) => (
          <div className="service" key={index}>
            <div className="serviceNumber">0{index + 1}</div>

            <div className="service_icon">{service.icon}</div>

            <div className="service_text">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
