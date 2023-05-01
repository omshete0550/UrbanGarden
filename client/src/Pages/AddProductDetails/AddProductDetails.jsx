import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import './AddProduct.css'
import { FaHandHoldingWater, FaRuler, FaSun } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['Product Details', 'Product Information', 'Confirm Information'];


export default function AddProductDetails() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate()
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { name, desc, price } = inpVal;
    if (name === "") {
      alert("Please enter the product name");
    }
    else if (desc === "") {
      alert("Please enter the description");
    }
    else if (price === "") {
      alert("Please enter price");
    }
    else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      localStorage.setItem("ProductDetails", JSON.stringify([...data, inpVal]));
    }
  };

  const addData = (e) => {
    e.preventDefault();
    const { seasons, category } = inpVal;
    if (category === "") {
      alert("Please enter the category");
    }
    else if (seasons === "") {
      alert("Please enter the season");
    }
    else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      localStorage.setItem("ProductDetails", JSON.stringify([...data, inpVal]));
    }
  };

  const [inpVal, setInpVal] = useState({
    name: "",
    desc: "",
    price: "",
    photos: "",
    category: "",
    season: "",
    postedby: "",
  })

  const [data, setData] = useState([]);

  const getData = (e) => {
    const { value, name } = e.target;
    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value
      }
    })
  }

  const handleReset = () => {
    setActiveStep(0);
    localStorage.clear();
    setInpVal({
      name: "",
      desc: "",
      price: "",
      photos: "",
      category: "",
      season: "",
      postedby: "",
    })
    setImagePreview(null)
  };

  //image upload states
  const [image, setImage] = useState(null);
  const [uplodingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "uploads");
    try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/deilddadk/image/upload", {
        method: "post",
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }
  const handleSubmit = async () => {
    try {
      if (!image) return alert("Please upload your profile picture");
      setUploadingImg(true);
      inpVal.photos = await uploadImage(image);
      setUploadingImg(false);
      inpVal.postedby = user.details.nursuries;
      await axios.post(`/products/${user.details.nursuries}`, inpVal)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>

        </React.Fragment>
      ) : (
        <React.Fragment>

          {activeStep === 0 &&
            <div className='ProductDetails'>
              <img src="https://media.istockphoto.com/id/1278906674/photo/monstera-in-a-pot-isolated-on-white-background-close-up-of-tropical-leaves-or-houseplant-that.jpg?s=612x612&w=0&k=20&c=_s8SHj6gP3oA0zx4jH2SvRJGvcLMnnHwMY_FvANDFiU=" alt="" />
              <div className='ProductInp'>
                <h6>Product Name</h6>
                <input type="text" name="name" className="input" placeholder="Product Name" onChange={getData}></input>
              </div>
              <div className='ProductInp'>
                <h6>Description</h6>
                <input type="text" name="desc" className="input" placeholder="Description" onChange={getData}></input>
              </div>
              <div className='ProductInp'>
                <h6>Product Price (in rupees)</h6>
                <input type="number" name="price" className="input" placeholder="Product Price" onChange={getData}></input>
              </div>
              <button onClick={handleNext}> Next</button>
            </div>
          }
          {activeStep === 1 &&
            <div className='ProductInformation'>
              <div className='ProInfoMulti'>
                <div>
                  <h1>Categories</h1>
                  <div className="all-categories">
                    <select name="category" id="categories" onChange={getData}>
                      <option value="Select">Categories</option>
                      <option value="Gardening">Gardening</option>
                      <option value="Plants">Plants</option>
                      <option value="pebble">Pebbles</option>
                      <option value="seed">Seeds</option>
                      <option value="soil">Soil & Fertilizer</option>
                      <option value="accessory">Accesories</option>
                      <option value="pot">Pots</option>
                      <option value="bulb">Bulbs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h1>Seasons</h1>
                  <div className="all-categories">
                    <select name="season" onChange={getData}>
                      <option value="Select">Seasons</option>
                      <option value="Summer">Summer</option>
                      <option value="Winter">Winter</option>
                      <option value="Rainy">Rainy</option>
                      <option value="Spring">Spring</option>
                      <option value="All Seasons">All Seasons</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='ProductInp'>
                {/* <h6>Product Size</h6> */}
                <input type="text" className="input" placeholder="Product size (for e.g, 25 x 50 cm)" onChange={getData}></input>
              </div>
              <div className='ProductInp'>
                {/* <h6>Sunlight Requirement</h6> */}
                <input type="text" className="input" placeholder="Sunlight Requirement (for e.g, indirect sunlight)" onChange={getData}></input>
              </div>
              <div className='ProductInp'>
                {/* <h6>Water Frequency</h6> */}
                <input type="text" className="input" placeholder="Water Frequency (for e.g, 25 x 50cm)" onChange={getData}></input>
              </div>

              <div className="ProductImage">
                <h1>Add Product Image</h1>
                <input type="file" name="image" id="image-upload" className="custom-file-input" hidden accept="image/png, image/jpeg" onChange={validateImg} />
              </div>
              <button onClick={addData} disabled={uplodingImg}> Next</button>
            </div>
          }

          {activeStep === 2 &&
            <div className='ConfirmInfoContainer'>
              <div className="ConfirmInfoCont">
                <div className='ConfirmImg'>
                  <img src={imagePreview} alt="" />
                </div>
                <div className='ConfirmInfo'>
                  <div className="headingProduct">
                    <h1>{inpVal.name}</h1>
                  </div>
                  <div className="priceProduct">
                    <p>${inpVal.price}</p>
                  </div>
                  <div className="descProduct">
                    <p>{inpVal.desc}</p>
                  </div>
                  <div className="sizeProduct">
                    <div className="iconFeature">
                      <FaRuler />
                    </div>
                    <div className="descFeature">
                      <h4>Season: </h4>
                      <p>{inpVal.season}</p>
                    </div>
                  </div>
                  <div className="sunlightProduct">
                    <div className="iconFeature">
                      <FaSun />
                    </div>
                    <div className="descFeature">
                      <h4>Category: </h4>
                      <p>{inpVal.category}</p>
                    </div>
                  </div>
                  <div className="waterProduct">
                    <div className="iconFeature">
                      <FaHandHoldingWater />
                    </div>
                    <div className="descFeature">
                      <h4>Water Frequency: </h4>
                      <p>Twice a day</p>
                    </div>
                  </div>

                </div>
              </div>
              <div className='resetproductaddpage'>
                <button onClick={handleReset}>Reset</button>
              </div>
              <div className='confirmproductaddpage'>
                <button onClick={handleSubmit}>Confirm</button>
              </div>
            </div>}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Box sx={{ flex: '1 1 auto' }} />
            {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
