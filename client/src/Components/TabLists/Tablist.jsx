import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Product from '../Carousel/Product'
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from "react";
import "../SingleCategLayout/GridCateg.css"
import '../TabLists/Tablist.css'
import CustomImageList from '../ImageList/CustomImageList';
import SingleNurRevBox from '../SingleNurRevBox/SingleNurRevBox';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Tablist(props) {
  const data = props.data
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation()
  const nurseryId = location.pathname.split('/')[2]
  const [dataa, setDataa] = useState([]);
  const getprods = async () => {
    const res = await axios.get(`/nurserys/${nurseryId}/products`);
    setDataa(res.data);
  };
  React.useEffect(() => {
    getprods();
  }, [location]);

  const product = dataa?.map((item) =>
    <Product name={item.name} url={item.photos[0]} key={item._id} price={item.price} description={item.desc} idx={item._id} />
  )

  const [popup, setPop] = useState(false);
  const handleClickOpen = () => {
    setPop(!popup)
  }

  const closePopup = () => {
    setPop(false)
  }

  return (
    <Box sx={{ width: '100%', marginLeft: '12%', marginTop: '25%', marginBottom: '5%' }}>

      <Box sx={{ borderBottom: 1, width: '75%', borderColor: 'divider' }}>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Other Products" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
          <Tab label="Photos" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0} >
        <div className='SingleNurOverview'>
          <h2>About this nursery</h2>
          <div className="SingleNurCateg">
            <h3>Categories</h3>
            <div className='SpeCategBtn'>
              <button>Gardening</button>
              <button>Pebbbles</button>
              <button>Pots</button>
            </div>

            <div className="AvgCost">
              <h3>Minimum Cost</h3>
              <span>Starts from ₹{data.leastPrice || 100} per Plant (approx.)</span>
              <p>Exclusive of applicable taxes and charges, if any</p>
            </div>

            <div className="moreInfo">
              <h3>More Info</h3>
              <div className="Info">
                <i><FaCheckCircle />Home Delivery</i>
                <i><FaCheckCircle />Home Delivery</i>
                <i><FaCheckCircle />Home Delivery</i>
                <i><FaCheckCircle />Home Delivery</i>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='SingleNurOrder'>
          <h2>Our Products</h2>
          <div className="parentGrid">
            {product}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className='SingleNurReview'>
          <h2>Reviews</h2>

          <div className="writeReviewPopupProduct">
            <button onClick={handleClickOpen}>WRITE A REVIEW</button>
            <div>
              {popup ?
                <div className="popup-main">
                  <div className="popup">
                    <img className='closecircleXmark' src="https://www.svgrepo.com/show/378998/circle-xmark.svg" onClick={closePopup} alt="" />

                    <div className="topwrite">
                      <h1>UrbanGarden</h1>
                    </div>

                    <div className="identitylabel">
                      <div className="identityicon">
                        <p>IC</p>
                      </div>
                      <div className="identitydetails">
                        <h3>Hamza Ali Sayed</h3>
                        <p>Post Publicly</p>
                      </div>
                    </div>
                    <div className="doreview">
                      <Box
                        sx={{
                          '& > legend': { mt: 2 },
                        }}
                      >
                        <Rating name="read-only" value={value} readOnly />
                      </Box>
                    </div>
                    <div className="typereview">
                      <textarea name="" id="" cols="45" rows="7"></textarea>
                    </div>
                    <div className="writereviewbuttons">
                      <div className="postbutton">
                        <button>POST</button>
                      </div>
                    </div>
                  </div>
                </div> : ""}
            </div>
          </div>
          {/* <WriteReviewPopUp trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        </WriteReviewPopUp> */}

          <SingleNurRevBox />
          <SingleNurRevBox />
          <SingleNurRevBox />
          <SingleNurRevBox />

        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className='SingleNurPhoto'>
          <h2>{data.name} Photos</h2>
          <CustomImageList />
        </div>
      </TabPanel>

    </Box>
  );
}
