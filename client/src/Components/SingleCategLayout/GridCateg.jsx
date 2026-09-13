import React, { useMemo } from "react";
import Product from "../Carousel/Product";
import "./GridCateg.css";
import useFetch from "../../hooks/useFetch";

const categoryAliases = {
  gardening: ["gardening"],
  plants: ["plants", "plant"],
  seeds: ["seeds", "seed"],
  bulbs: ["bulbs", "bulb"],
  pots: ["pots", "pot"],
  "soil & fertilizer": ["soil & fertilizer", "soil", "fertilizer"],
  pebbles: ["pebbles", "pebble"],
  accessories: ["accessories", "accessory"],
};

const categoryMatches = (productCategory, filterCategory) => {
  const productValue = String(productCategory || "").toLowerCase().trim();
  const filterValue = String(filterCategory || "").toLowerCase().trim();
  const aliases = categoryAliases[filterValue] || [filterValue];

  return aliases.includes(productValue);
};

const GridCateg = ({ gridheading, filters, sort, onSortChange }) => {
  const category = gridheading;
  const { data, loading } = useFetch("/products");

  const filteredProducts = useMemo(() => {
    const products = Array.isArray(data) ? data : [];
    const selectedCategories = filters.categories;
    const selectedSeasons = filters.seasons.map((season) => season.toLowerCase());
    const ratingThresholds = filters.ratings.map((rating) => Number(rating[0]));
    const minimumRating = ratingThresholds.length ? Math.min(...ratingThresholds) : 0;

    const matchingProducts = products.filter((product) => {
      const withinCategory = selectedCategories.length
        ? selectedCategories.some((selected) => categoryMatches(product.category, selected))
        : categoryMatches(product.category, category);
      const productSeason = String(product.season || "").toLowerCase();
      const withinSeason =
        selectedSeasons.length === 0 || selectedSeasons.includes(productSeason);
      const price = Number(product.price) || 0;
      const withinPrice = price >= filters.price[0] && price <= filters.price[1];
      const withinRating = (Number(product.rating) || 0) >= minimumRating;

      return withinCategory && withinSeason && withinPrice && withinRating;
    });

    return [...matchingProducts].sort((first, second) => {
      if (sort === "price-low") return Number(first.price) - Number(second.price);
      if (sort === "price-high") return Number(second.price) - Number(first.price);
      if (sort === "newest") {
        return new Date(second.createdAt || 0) - new Date(first.createdAt || 0);
      }

      return 0;
    });
  }, [category, data, filters, sort]);

  const filtersApplied =
    filters.categories.length > 0 ||
    filters.seasons.length > 0 ||
    filters.ratings.length > 0 ||
    filters.price[0] > 0 ||
    filters.price[1] < 5000;

  return (
    <section className="gridCategSection">
      <div className="gridHeader">
        <div className="gridHeaderCopy">
          <p className="gridEyebrow">Shop the collection</p>
          <div className="gridTitleRow">
            <h1 className="gridheading">{category}</h1>
            {!loading && (
              <span className="gridItemCount">
                {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <p className="gridDescription">
            Browse available {String(category).toLowerCase()} from listed nurseries.
          </p>
        </div>
        <select
          aria-label="Sort products"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {loading ? (
        <div className="grid-loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : filteredProducts.length ? (
        <div className="parentGrid">
          {filteredProducts.map((item) => (
            <Product
              name={item.name}
              url={item.photos?.[0]}
              key={item._id}
              price={item.price}
              rating={item.rating}
              description={item.description || item.desc}
              idx={item._id}
            />
          ))}
        </div>
      ) : (
        <div className="emptyGrid">
          <h2>{filtersApplied ? "No matching products" : "No products found"}</h2>
          <p>
            {filtersApplied
              ? "Try adjusting or clearing your filters."
              : "This category does not have products yet."}
          </p>
        </div>
      )}
    </section>
  );
};

export default GridCateg;
