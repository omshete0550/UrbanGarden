
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import './AddProduct.css'
import { FaHandHoldingWater, FaRuler, FaSun} from 'react-icons/fa'

const steps = ['Product Details', 'Product Information', 'Confirm Information'];


export default function AddProductDetails() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    
    e.preventDefault();
  //   console.log(inpVal)

    const {name, description, price, seasons, categories, waterfreq, size, sunlight} = inpVal;

    if(name === ""){
      alert("Please enter the product name");
    }
    else if(description === ""){
      alert("Please enter the description");
    }
    else if(price === ""){
      alert("Please enter price");
    }
    else{
       // console.log("Data added successfully");
       let newSkipped = skipped;
       if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
       }
   
       setActiveStep((prevActiveStep) => prevActiveStep + 1);
       setSkipped(newSkipped);
       localStorage.setItem("ProductDetails", JSON.stringify([...data,inpVal])); 
    }
  };

  const addData = (e) => {
    
    e.preventDefault();
  //   console.log(inpVal)

    const {seasons, categories, waterfreq, size, sunlight} = inpVal;
    if(size === ""){
      alert("Please enter the size");
    }
    else if(sunlight === ""){
      alert("Please enter the sunlight requirement");
    }
    else if(waterfreq === ""){
      alert("Please enter the water frequency");
    }
    else if(categories === ""){
      alert("Please enter the category");
    }
    else if(seasons === ""){
      alert("Please enter the season");
    }
    else{
       // console.log("Data added successfully");
       let newSkipped = skipped;
       if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
       }
   
       setActiveStep((prevActiveStep) => prevActiveStep + 1);
       setSkipped(newSkipped);
       localStorage.setItem("ProductDetails", JSON.stringify([...data,inpVal])); 
    }
  };


 

  const [inpVal, setInpVal] = useState({
    name: "",
    description: "",
    price: "",
    categories: "",
    seasons: "",
    Product: "",
    size: "",
    sunlight: "",
    waterfreq: "",
  })

  const [data, setData] = useState([]);

  const getData = (e) => {
    // console.log(e.target.value);

    const {value, name} = e.target;
    // console.log(value, name);

    setInpVal(() =>{
      return{
        ...inpVal,
        [name]: value
      }
    })
  }





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

          { activeStep === 0 && 
          <div className='ProductDetails'>
            <img src="https://media.istockphoto.com/id/1278906674/photo/monstera-in-a-pot-isolated-on-white-background-close-up-of-tropical-leaves-or-houseplant-that.jpg?s=612x612&w=0&k=20&c=_s8SHj6gP3oA0zx4jH2SvRJGvcLMnnHwMY_FvANDFiU=" alt="" />
            <div className='ProductInp'>
              <h6>Product Name</h6>
              <input type="text"  name="name" className="input" placeholder="Product Name" onChange={getData}></input>
            </div>
            <div className='ProductInp'>
              <h6>Description</h6>
              <input type="text" name="description" className="input" placeholder="Description" onChange={getData}></input>
            </div>
            <div className='ProductInp'>
              <h6>Product Price (in rupees)</h6>
              <input type="number" name="price" className="input" placeholder="Product Price" onChange={getData}></input>
            </div>
            <button onClick={handleNext}> Next</button>
          </div>
          }
          { activeStep === 1 && 
          <div className='ProductInformation'>
           <div className='ProInfoMulti'>
              <div>
                <h1>Categories</h1>
                <div className="all-categories">
                    <select name="categories" id="categories" onChange={getData}>
                        <option value="Select">Categories</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Plants">Plants</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Soil">Soil</option>
                        <option value="Fertilizers">Fertilizers</option>
                    </select>
                </div>
              </div>
              
              <div>
                <h1>Seasons</h1>
                <div className="all-categories">
                    <select name="seasons" onChange={getData}>
                        <option value="Select">Seasons</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                        <option value="Rainy">Rainy</option>
                        <option value="All Seasons">All Seasons</option>
                    </select>
                </div>
              </div>
           </div>
           <div className='ProductInp'>
              {/* <h6>Product Size</h6> */}
              <input type="text"  name="size" className="input" placeholder="Product size (for e.g, 25 x 50 cm)" onChange={getData}></input>
            </div>
            <div className='ProductInp'>
              {/* <h6>Sunlight Requirement</h6> */}
              <input type="text" name="sunlight" className="input" placeholder="Sunlight Requirement (for e.g, indirect sunlight)" onChange={getData}></input>
            </div>
            <div className='ProductInp'>
              {/* <h6>Water Frequency</h6> */}
              <input type="text" name="waterfreq" className="input" placeholder="Water Frequency (for e.g, 25 x 50cm)" onChange={getData}></input>
            </div>

            <div className="ProductImage">
            <h1>Add Product Image</h1>
              <input type="file" name='Product'  className="custom-file-input"  onChange={getData}/>
            </div>
            <button onClick={addData}> Next</button>
          </div>
          }

          { activeStep === 2 && 
           <div className='ConfirmInfoContainer'>
           <div className="ConfirmInfoCont">
              <div className='ConfirmImg'>
                <img src="https://media.istockphoto.com/id/1278906674/photo/monstera-in-a-pot-isolated-on-white-background-close-up-of-tropical-leaves-or-houseplant-that.jpg?s=612x612&w=0&k=20&c=_s8SHj6gP3oA0zx4jH2SvRJGvcLMnnHwMY_FvANDFiU=" alt="" />
              </div>
              <div className='ConfirmInfo'>
                <div className="headingProduct">
                    <h1>{inpVal.name}</h1>
                </div>
                <div className="priceProduct">
                    <p>${inpVal.price}</p>
                </div>
                <div className="descProduct">
                    <p>{inpVal.description}</p>
                </div>
                <div className="sizeProduct">
                    <div className="iconFeature">
                        <FaRuler/>
                    </div>
                    <div className="descFeature">
                        <h4>Size: </h4>
                        <p>{inpVal.size}</p>
                    </div>
                </div>
                <div className="sunlightProduct">
                    <div className="iconFeature">
                        <FaSun/>
                    </div>
                    <div className="descFeature">
                        <h4>Sunnlight Requirement: </h4>
                        <p>{inpVal.sunlight}</p>
                    </div>
                </div>
                <div className="waterProduct">
                    <div className="iconFeature">
                        <FaHandHoldingWater/>
                    </div>
                    <div className="descFeature">
                        <h4>Water Frequency: </h4>
                        <p>{inpVal.waterfreq}</p>
                    </div>
                </div>
      
              </div>
           </div>
           <button onClick={handleNext}>Confirm</button>
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
