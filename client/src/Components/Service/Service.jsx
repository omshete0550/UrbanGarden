import React from "react";
import "./Service.css";
import { FaRecycle, FaShieldAlt, FaTags, FaTint } from "react-icons/fa";

const services = [
  {
    icon: <FaRecycle />,
    title: "Sustainable Packaging",
    description:
      "Your plants are carefully packed using secure and recyclable materials.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Damage Protection",
    description:
      "Received a damaged plant? We provide free replacements so you can shop worry-free.",
  },
  {
    icon: <FaTags />,
    title: "Exclusive Offers",
    description:
      "Enjoy seasonal deals, special discounts and exciting offers on your favourite products.",
  },
  {
    icon: <FaTint />,
    title: "Self-Watering Pots",
    description:
      "Selected plants come with self-watering pots to make plant care easier.",
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
