import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { FiChevronDown, FiSliders } from "react-icons/fi";
import "./FilterCateg.css";

const filterGroups = [
  {
    title: "Categories",
    options: [
      "Gardening",
      "Plants",
      "Seeds",
      "Bulbs",
      "Pots",
      "Soil & Fertilizer",
      "Pebbles",
      "Accessories",
    ],
  },
  {
    title: "Season",
    options: ["Summer", "Winter", "Rainy", "All Seasons"],
  },
  {
    title: "Rating",
    options: ["4 stars & up", "3 stars & up", "2 stars & up"],
  },
];

const FilterGroup = ({ title, options }) => (
  <details className="filter_type" open>
    <summary>
      <span>{title}</span>
      <FiChevronDown />
    </summary>
    <div className="filter_list">
      {options.map((option) => (
        <label className="checkbox" key={option}>
          <input name={title} type="checkbox" />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </details>
);

const FilterCateg = () => {
  const [range, setRange] = useState([0, 5000]);

  function handleChanges(event, newValue) {
    setRange(newValue);
  }

  return (
    <aside className="parentFilter" aria-label="Product filters">
      <div className="headingFilter">
        <h3>
          <FiSliders />
          Filters
        </h3>
        <button type="button">Clear</button>
      </div>

      <div className="filterTypes">
        {filterGroups.map((group) => (
          <FilterGroup
            title={group.title}
            options={group.options}
            key={group.title}
          />
        ))}

        <details className="filter_type" open>
          <summary>
            <span>Price</span>
            <FiChevronDown />
          </summary>
          <div className="filter_list price-filter">
            <Slider
              value={range}
              onChange={handleChanges}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
              sx={{
                color: "var(--ug-primary)",
              }}
            />
            <p className="pricing">
              Rs. {range[0]} - Rs. {range[1]}
            </p>
          </div>
        </details>

        <details className="filter_type" open>
          <summary>
            <span>City</span>
            <FiChevronDown />
          </summary>
          <div className="filter_list">
            <input type="text" className="input" placeholder="City name" />
          </div>
        </details>
      </div>
    </aside>
  );
};

export default FilterCateg;
