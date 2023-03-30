import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './MultiStepForm.css'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const steps = ['Basic Information', 'Nursery Information', 'Confirm Information'];

export default function NurseryForm() {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [inpVal, setInpVal] = useState({
    name: "",
    owner: user.details._id,
    city: "",
    address: "",
    photos: "",
    desc: "",
    leastPrice: 0
  })
  const [data, setData] = useState([]);
  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = (e) => {
    e.preventDefault();
    const { name, desc, city } = inpVal;

    if (name === "") {
      alert("Please enter your name");
    }
    else if (desc === "") {
      alert("Please enter the desc");
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
      localStorage.setItem("User", JSON.stringify([...data, inpVal]));
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
      localStorage.setItem("User", JSON.stringify([...data, inpVal]));
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
    localStorage.clear();
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
  const [upladingImg, setUploadingImg] = useState(false);
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
      inpVal.photos = await uploadImage(image);
      const res = await axios.post(`/nurserys/${user.details._id}`, inpVal)
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>

          {activeStep === 0 &&
            <>
              <div className='NurseryDetails'>
                <img src="https://img.freepik.com/free-vector/open-view-greenhouse-with-many-plants-inside_1308-58306.jpg" alt="" />
                <div className='NurseryInp'>
                  <h6>Nursery Name</h6>
                  <input type="text" name="name" className="input" placeholder="Enter Nursery Name" onChange={getData}></input>
                </div>
                <div className='NurseryInp'>
                  <h6>Nursery desc</h6>
                  <input type="text" name="desc" className="input" placeholder="Enter Nursery desc" onChange={getData}></input>
                </div>
                <div className='NurseryInp'>
                  <h6>Nursery City</h6>
                  <input type="text" name="city" className="input" placeholder="Enter City" onChange={getData}></input>
                </div>
                <button onClick={handleNext}> Next</button>
              </div>

            </>
          }

          {activeStep === 1 &&
            <>
              <div className='NurseryDetails'>
                <img src="https://img.freepik.com/free-vector/open-view-greenhouse-with-many-plants-inside_1308-58306.jpg" alt="" />

                <div className='NurseryInp'>
                  <h6>Phone Number</h6>
                  <input type="number" name="phone" className="input" placeholder="Enter Phone Number" onChange={getData}></input>
                </div>
                <div className='NurseryInpAdd'>
                  <h6>Nursery Address</h6>
                  <textarea type="text" name="address" className="input" placeholder='Enter Nursery Address' onChange={getData}></textarea>
                </div>
                <div className="NurImgUp">
                  <h1>Upload Nursery Images</h1>
                  <input type="file" name="image" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                </div>
                <button onClick={addData}> Next</button>
              </div>

            </>
          }

          {activeStep === 2 &&
            <>
              <div className="ConfirmInfo">
                <h1>Name: {inpVal.name}</h1>
                <span>desc: {inpVal.desc}</span>
                <span>City: {inpVal.city}</span>
                <span>Phone No: {inpVal.phone}</span>
                <span>Address: {inpVal.address}</span>
                <img src={imagePreview} />
              </div>
              <button onClick={handleReset}> Reset</button>
              <button onClick={handleSubmit}> Submit</button>
            </>}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
