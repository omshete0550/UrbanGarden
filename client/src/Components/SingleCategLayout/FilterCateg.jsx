import React from "react";
import Slider from "@mui/material/Slider";
import { FiChevronDown, FiSliders } from "react-icons/fi";
import "./FilterCateg.css";

const filterGroups = [
  {
    key: "categories",
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
    key: "seasons",
    title: "Season",
    options: ["Summer", "Winter", "Rainy", "Spring", "All Seasons"],
  },
  {
    key: "ratings",
    title: "Rating",
    options: ["4 stars & up", "3 stars & up", "2 stars & up"],
  },
];

const FilterGroup = ({ group, selected, onToggle }) => (
  <details className="filter_type" open>
    <summary>
      <span>{group.title}</span>
      <FiChevronDown />
    </summary>
    <div className="filter_list">
      {group.options.map((option) => (
        <label className="checkbox" key={option}>
          <input
            checked={selected.includes(option)}
            name={group.key}
            type="checkbox"
            onChange={() => onToggle(group.key, option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </details>
);

const FilterCateg = ({ filters, onChange, onClear }) => {
  const toggleOption = (key, option) => {
    const values = filters[key];

    onChange({
      ...filters,
      [key]: values.includes(option)
        ? values.filter((value) => value !== option)
        : [...values, option],
    });
  };

  return (
    <aside className="parentFilter" aria-label="Product filters">
      <div className="headingFilter">
        <h3>
          <FiSliders />
          Filters
        </h3>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="filterTypes">
        {filterGroups.map((group) => (
          <FilterGroup
            group={group}
            key={group.key}
            selected={filters[group.key]}
            onToggle={toggleOption}
          />
        ))}

        <details className="filter_type" open>
          <summary>
            <span>Price</span>
            <FiChevronDown />
          </summary>
          <div className="filter_list price-filter">
            <Slider
              value={filters.price}
              onChange={(_, value) => onChange({ ...filters, price: value })}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
              sx={{ color: "var(--ug-primary)" }}
            />
            <p className="pricing">
              Rs. {filters.price[0]} - Rs. {filters.price[1]}
            </p>
          </div>
        </details>
      </div>
    </aside>
  );
};

export default FilterCateg;
