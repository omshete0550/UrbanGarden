import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./AddProduct.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaHandHoldingWater,
  FaImage,
  FaLeaf,
  FaRuler,
  FaRupeeSign,
  FaSeedling,
  FaSun,
  FaUpload,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../lib/apiBase";

const steps = ["Product Details", "Product Information", "Confirm Information"];

export default function AddProductDetails() {
  const [activeStep, setActiveStep] = React.useState(0);
  const user = useSelector((state) => state.user.currentUser);
  const nurseryId = (user?.details?.nurseryId || user?.details?.nursuries);
  const navigate = useNavigate();
  const [inpVal, setInpVal] = useState({
    name: "",
    description: "",
    price: "",
    photos: "",
    category: "",
    season: "",
    nurseryId: "",
    size: "",
    sunlight: "",
    water: "",
  });
  const [image, setImage] = useState(null);
  const [uplodingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const getData = (e) => {
    const { value, name } = e.target;
    setInpVal((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { name, description, price } = inpVal;

    if (!name.trim()) return alert("Please enter the product name");
    if (!description.trim()) return alert("Please enter the description");
    if (!price) return alert("Please enter price");

    setActiveStep(1);
    localStorage.setItem("ProductDetails", JSON.stringify([inpVal]));
  };

  const addData = (e) => {
    e.preventDefault();
    const { season, category } = inpVal;

    if (!category) return alert("Please select the category");
    if (!season) return alert("Please select the season");

    setActiveStep(2);
    localStorage.setItem("ProductDetails", JSON.stringify([inpVal]));
  };

  const handleReset = () => {
    setActiveStep(0);
    localStorage.removeItem("ProductDetails");
    setInpVal({
      name: "",
      description: "",
      price: "",
      photos: "",
      category: "",
      season: "",
      nurseryId: "",
      size: "",
      sunlight: "",
      water: "",
    });
    setImage(null);
    setImagePreview(null);
    setSubmitError("");
  };

  function validateImg(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "uploads");

    setUploadingImg(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deilddadk/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const urlData = await res.json();
    setUploadingImg(false);
    return urlData.url;
  }

  const handleSubmit = async () => {
    try {
      if (!nurseryId) {
        setSubmitError(
          "Your nursery is not linked to this session. Log out and log in again, then try Add Product."
        );
        return;
      }

      if (!image) return alert("Please upload your product image");

      setSubmitError("");
      const photoUrl = await uploadImage();
      const productPayload = {
        ...inpVal,
        price: Number(inpVal.price),
        photos: [photoUrl],
        nurseryId: nurseryId,
      };

      await axios.post(`${API_BASE_URL}/products/${nurseryId}`, productPayload);
      navigate(`/nursery/${nurseryId}`);
    } catch (err) {
      setUploadingImg(false);
      setSubmitError(
        err.response?.data?.message || "Unable to add product. Please try again."
      );
      console.log(err);
    }
  };

  return (
    <Box className="productFormShell">
      <div className="productFormHeader">
        <span className="formEyebrow">Nursery inventory</span>
        <h1>Add a product</h1>
        <p>
          Create a clear product listing with pricing, category, care details,
          and image.
        </p>
      </div>

      <Stepper className="productStepper" activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {!nurseryId && (
        <div className="productNotice">
          Your nursery was created, but this session has not refreshed its
          nursery id yet.
          <Link to="/Login"> Log in again</Link> before submitting products.
        </div>
      )}

      {activeStep === 0 && (
        <div className="productFormGrid">
          <div className="productFormFields">
            <div className="ProductInp">
              <label htmlFor="product-name">
                <FaLeaf />
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                name="name"
                className="input"
                placeholder="Monstera Deliciosa"
                value={inpVal.name}
                onChange={getData}
              />
            </div>
            <div className="ProductInp">
              <label htmlFor="product-desc">
                <FaSeedling />
                Description
              </label>
              <textarea
                id="product-desc"
                name="description"
                className="input"
                placeholder="Add plant size, care notes, and what customers should know"
                value={inpVal.description}
                onChange={getData}
              />
            </div>
            <div className="ProductInp">
              <label htmlFor="product-price">
                <FaRupeeSign />
                Product Price
              </label>
              <input
                id="product-price"
                type="number"
                name="price"
                className="input"
                placeholder="499"
                value={inpVal.price}
                onChange={getData}
              />
            </div>
            <button className="productPrimaryBtn" onClick={handleNext}>
              Next <FaArrowRight />
            </button>
          </div>

          <div className="productVisualCard">
            <img
              src="https://media.istockphoto.com/id/1278906674/photo/monstera-in-a-pot-isolated-on-white-background-close-up-of-tropical-leaves-or-houseplant-that.jpg?s=612x612&w=0&k=20&c=_s8SHj6gP3oA0zx4jH2SvRJGvcLMnnHwMY_FvANDFiU="
              alt="Potted monstera plant"
            />
            <div>
              <span>Step 1</span>
              <h2>Make the product easy to understand</h2>
              <p>Good names, prices, and descriptions help customers choose faster.</p>
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="productFormGrid">
          <div className="productFormFields">
            <div className="productTwoCol">
              <div className="ProductInp">
                <label htmlFor="product-category">Category</label>
                <select
                  id="product-category"
                  name="category"
                  className="input"
                  value={inpVal.category}
                  onChange={getData}
                >
                  <option value="">Select category</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Plants">Plants</option>
                  <option value="pebble">Pebbles</option>
                  <option value="seed">Seeds</option>
                  <option value="soil">Soil & Fertilizer</option>
                  <option value="accessory">Accessories</option>
                  <option value="pot">Pots</option>
                  <option value="bulb">Bulbs</option>
                </select>
              </div>
              <div className="ProductInp">
                <label htmlFor="product-season">Season</label>
                <select
                  id="product-season"
                  name="season"
                  className="input"
                  value={inpVal.season}
                  onChange={getData}
                >
                  <option value="">Select season</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Spring">Spring</option>
                  <option value="All Seasons">All Seasons</option>
                </select>
              </div>
            </div>

            <div className="ProductInp">
              <label htmlFor="product-size">
                <FaRuler />
                Product Size
              </label>
              <input
                id="product-size"
                type="text"
                name="size"
                className="input"
                placeholder="25 x 50 cm"
                value={inpVal.size}
                onChange={getData}
              />
            </div>
            <div className="ProductInp">
              <label htmlFor="product-sunlight">
                <FaSun />
                Sunlight Requirement
              </label>
              <input
                id="product-sunlight"
                type="text"
                name="sunlight"
                className="input"
                placeholder="Indirect sunlight"
                value={inpVal.sunlight}
                onChange={getData}
              />
            </div>
            <div className="ProductInp">
              <label htmlFor="product-water">
                <FaHandHoldingWater />
                Water Frequency
              </label>
              <input
                id="product-water"
                type="text"
                name="water"
                className="input"
                placeholder="Twice a week"
                value={inpVal.water}
                onChange={getData}
              />
            </div>

            <div className="ProductImage">
              <label htmlFor="product-image-upload" className="productUploadBox">
                <FaUpload />
                <span>{image ? image.name : "Upload product image"}</span>
                <small>PNG or JPG under 1 MB</small>
              </label>
              <input
                type="file"
                name="image"
                id="product-image-upload"
                accept="image/png, image/jpeg"
                onChange={validateImg}
              />
            </div>

            <div className="productActionRow productActionRowLeft">
              <button className="productSecondaryBtn" onClick={handleBack}>
                <FaArrowLeft /> Back
              </button>
              <button
                className="productPrimaryBtn"
                onClick={addData}
                disabled={uplodingImg}
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="productVisualCard">
            {imagePreview ? (
              <img src={imagePreview} alt="Selected product preview" />
            ) : (
              <div className="productEmptyPreview">
                <FaImage />
                <span>Image preview</span>
              </div>
            )}
            <div>
              <span>Step 2</span>
              <h2>Add category and care details</h2>
              <p>These details make filtering and product comparison more useful.</p>
            </div>
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <>
          <div className="productConfirmGrid">
            <div className="productConfirmImage">
              {imagePreview ? (
                <img src={imagePreview} alt="Selected product preview" />
              ) : (
                <div className="productEmptyPreview">
                  <FaImage />
                  <span>No image selected</span>
                </div>
              )}
            </div>

            <div className="productConfirmInfo">
              <span className="formEyebrow">Confirm listing</span>
              <h1>{inpVal.name}</h1>
              <strong>Rs. {inpVal.price}</strong>
              <p>{inpVal.description}</p>
              <div className="productConfirmList">
                <span><FaRuler /> Size: {inpVal.size || "Not added"}</span>
                <span><FaSun /> Season: {inpVal.season}</span>
                <span><FaLeaf /> Category: {inpVal.category}</span>
                <span><FaHandHoldingWater /> Water: {inpVal.water || "Not added"}</span>
              </div>
            </div>
          </div>

          <div className="productActionRow">
            <button className="productSecondaryBtn" onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
            <button className="productSecondaryBtn" onClick={handleReset}>
              Reset
            </button>
            <button
              className="productPrimaryBtn"
              onClick={handleSubmit}
              disabled={uplodingImg || !nurseryId}
            >
              {uplodingImg ? "Submitting..." : <><FaCheck /> Confirm</>}
            </button>
          </div>
          {submitError && <p className="productSubmitError">{submitError}</p>}
        </>
      )}
    </Box>
  );
}


