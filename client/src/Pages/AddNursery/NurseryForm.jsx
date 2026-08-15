import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './MultiStepForm.css'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../lib/apiBase';
import { FaArrowRight, FaCheck, FaMapMarkerAlt, FaPhoneAlt, FaSeedling, FaStore, FaUpload } from 'react-icons/fa';
const steps = ['Basic Information', 'Nursery Information', 'Confirm Information'];

export default function NurseryForm() {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [inpVal, setInpVal] = useState({
    name: "",
    owner: user.details._id,
    city: "",
    address: "",
    photos: "",
    description: "",
    leastPrice: 0
  })
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = (e) => {
    e.preventDefault();
    const { name, description, city } = inpVal;

    if (name === "") {
      alert("Please enter your name");
    }
    else if (description === "") {
      alert("Please enter the description");
    }
    else if (city === "") {
      alert("Please enter your city");
    }
    else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      localStorage.setItem("User", JSON.stringify([inpVal]));
    }
  };

  const addData = (e) => {
    e.preventDefault();
    const { phone, address } = inpVal;

    if (phone === "") {
      alert("Please enter your phone number");
    }
    else if (address === "") {
      alert("Please enter your address");
    }
    else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      localStorage.setItem("User", JSON.stringify([inpVal]));
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    localStorage.clear();
    setInpVal({
      name: "",
      owner: user.details._id,
      city: "",
      address: "",
      photos: "",
      description: "",
      leastPrice: 0
    })
    setImage(null)
    setImagePreview(null)
  };

  const getData = (e) => {
    const { value, name } = e.target;
    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value
      }
    })
  }

  //image upload states
  const [image, setImage] = useState(null);
  const [uplodingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitError, setSubmitError] = useState("");

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
      setSubmitError("");
      setUploadingImg(true);
      const photoUrl = await uploadImage(image);
      setUploadingImg(false);
      await axios.post(`${API_BASE_URL}/nurseries/${user.details._id}`, {
        ...inpVal,
        photos: photoUrl,
      })
      navigate("/")
    } catch (err) {
      setUploadingImg(false);
      setSubmitError(err.response?.data?.message || "Unable to create nursery. Please try again.");
      console.log(err)
    }
  };

  return (
    <Box className="nurseryFormShell">
      <div className="nurseryFormHeader">
        <span className="formEyebrow">Nursery setup</span>
        <h1>Create your nursery profile</h1>
        <p>Add the details customers need before they discover your plants and products.</p>
      </div>

      <Stepper className="nurseryStepper" activeStep={activeStep}>
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>

          {activeStep === 0 &&
            <>
              <div className='NurseryDetails nurseryFormGrid'>
                <div className="nurseryFormFields">
                  <div className='NurseryInp'>
                    <label htmlFor="nursery-name">
                      <FaStore />
                      Nursery Name
                    </label>
                    <input id="nursery-name" type="text" name="name" className="input" placeholder="Green Leaf Nursery" onChange={getData}></input>
                  </div>
                  <div className='NurseryInp'>
                    <label htmlFor="nursery-desc">
                      <FaSeedling />
                      Nursery Description
                    </label>
                    <textarea id="nursery-desc" name="description" className="input" placeholder="Tell customers what makes your nursery special" onChange={getData}></textarea>
                  </div>
                  <div className='NurseryInp'>
                    <label htmlFor="nursery-city">
                      <FaMapMarkerAlt />
                      Nursery City
                    </label>
                    <input id="nursery-city" type="text" name="city" className="input" placeholder="Mumbai" onChange={getData}></input>
                  </div>
                  <button className="nurseryPrimaryBtn" onClick={handleNext}>
                    Next <FaArrowRight />
                  </button>
                </div>

                <div className="nurseryVisualCard">
                  <img src="https://i.ytimg.com/vi/w5pdmGOX9to/maxresdefault.jpg" alt="Nursery greenhouse preview" />
                  <div>
                    <span>Step 1</span>
                    <h2>Basic nursery identity</h2>
                    <p>Use clear details so local customers can recognize your nursery quickly.</p>
                  </div>
                </div>
              </div>

            </>
          }

          {activeStep === 1 &&
            <>
              <div className='NurseryDetails nurseryFormGrid'>
                <div className="nurseryFormFields">
                  <div className='NurseryInp'>
                    <label htmlFor="nursery-phone">
                      <FaPhoneAlt />
                      Phone Number
                    </label>
                    <input id="nursery-phone" type="tel" name="phone" className="input" placeholder="9876543210" onChange={getData}></input>
                  </div>
                  <div className='NurseryInpAdd'>
                    <label htmlFor="nursery-address">
                      <FaMapMarkerAlt />
                      Nursery Address
                    </label>
                    <textarea id="nursery-address" name="address" className="input" placeholder='Shop number, street, area, city' onChange={getData}></textarea>
                  </div>
                  <div className="NurImgUp">
                    <label htmlFor="image-upload" className="uploadBox">
                      <FaUpload />
                      <span>{image ? image.name : "Upload nursery image"}</span>
                      <small>PNG or JPG under 1 MB</small>
                    </label>
                    <input type="file" name="image" id="image-upload" accept="image/png, image/jpeg" onChange={validateImg} />
                  </div>
                  <button className="nurseryPrimaryBtn" disabled={uplodingImg} onClick={addData}>
                    Next <FaArrowRight />
                  </button>
                </div>

                <div className="nurseryVisualCard uploadPreviewCard">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Selected nursery preview" />
                  ) : (
                    <img src="https://i.ytimg.com/vi/w5pdmGOX9to/maxresdefault.jpg" alt="Nursery greenhouse preview" />
                  )}
                  <div>
                    <span>Step 2</span>
                    <h2>Contact and location</h2>
                    <p>Add a reachable phone number, address, and a strong nursery photo.</p>
                  </div>
                </div>
              </div>

            </>
          }

          {activeStep === 2 &&
            <>
              <div className="Confirminfo">
                <div className='confirminfoImagePrev'>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Selected nursery preview" />
                  ) : (
                    <div className="emptyPreview">No image selected</div>
                  )}
                </div>

                <div className='confirminfoprev'>
                  <span className="formEyebrow">Confirm details</span>
                  <h1>{inpVal.name}</h1>
                  <p>{inpVal.description}</p>
                  <div className="confirmList">
                    <span><FaMapMarkerAlt /> {inpVal.city}</span>
                    <span><FaPhoneAlt /> {inpVal.phone}</span>
                    <span><FaStore /> {inpVal.address}</span>
                  </div>
                </div>

              </div>
              <div className='nurseryActionRow'>
                <Button className='resetbtnNur' onClick={handleReset}>Reset</Button>
                <Button className='PrevSubbtn' disabled={uplodingImg} onClick={handleSubmit}>
                  {uplodingImg ? "Submitting..." : <><FaCheck /> Submit</>}
                </Button>
              </div>
              {submitError && <p className="nurserySubmitError">{submitError}</p>}
            </>}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}


