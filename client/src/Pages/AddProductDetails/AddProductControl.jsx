import React from "react";
import AddProductDetails from "./AddProductDetails";
import "./AddProduct.css";

const AddProductControl = () => {
  return (
    <>
      <div className="MultiStepProduct">
        <div className="AddBxPro">
          <AddProductDetails />
        </div>
      </div>
    </>
  );
};

export default AddProductControl;
