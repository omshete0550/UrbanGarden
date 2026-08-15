import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import { motion } from "framer-motion";
import { textVariants } from "../../motion";

function CategoryBox(props) {
  const abc = `/category/${props.title}`;

  return (
    <motion.div
      variants={textVariants("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="CategoryCard"
    >
      <div className="Categorycontent">
        <h2 className="title">{props.title.toUpperCase()}</h2>
        <p className="copy">{props.content}</p>
        <Link to={abc}>
          <button className="btn" aria-label={`Shop ${props.title} products`}>
            Shop {props.title}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default CategoryBox;
