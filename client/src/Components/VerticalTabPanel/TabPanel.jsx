import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserAddressBox from '../UserAddressBox/UserAddressBox';
import { FaAddressBook, FaBoxOpen, FaShoppingBag } from 'react-icons/fa';
import './TabPanel.css';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/apiCalls';
import useFetch from "../../hooks/useFetch"
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {

  const user = props.user
  const [value, setValue] = useState(0);
  const [popup, setPop] = useState(false);
  const [inpVal, setInpVal] = useState({
    username: "",
    email: "",
    phone: "",
  })
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setPop(!popup)
  }
  const closePopup = () => {
    setPop(false)
  }
  const getData = (e) => {
    const { value, name } = e.target;

    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value
      }
    })
  }
  const addData = async (e) => {
    const id = user._id
    e.preventDefault();
    const { username, email, phone } = inpVal;
    if (username === "") {
      alert("Please enter your name");
    }
    else if (email === "") {
      alert("Please enter your address");
    }
    else if (phone === "") {
      alert("Please enter your number");
    }
    else {
      update(dispatch, { username, email, phone, id });
      closePopup()
    }
  };
  const { data, loading } = useFetch('/orders/find/' + user._id)


  const ProductOrder = ({ product }) => {
    const [res, setRes] = useState(null)
    useEffect(() => {
      async function fetching(productId) {
        const rest = await axios.get(`/products/${productId}`)
        setRes(rest.data)
      }
      fetching(product.productId)
    }, [])
    if (!res) return null
    return (
      <div>
        <div className="orderproductcard" key={res._id}>
          <img src={res.photos[0]} alt="" />
          <div className="orderproductdesc">
            <span>{res.name}</span>
            <p>{res.price}*{product.quantity}</p>
          </div>
        </div></div>)
  }
  const PrevHistCarts = () => {
    return (
      <div>
        {data.map((order) => (
          <div className="OrderHistory" key={order._id}>
            <div className="orderhistory">
              <div className="orderhistoryheader">
                <div className="OrderPlaced">
                  <span>Order Placed</span>
                  <p>{order.createdAt}</p>
                </div>
                <div className="OrderTotal">
                  <span>Total</span>
                  <p>{order.amount}</p>
                </div>
                <div className="OrderShip">
                  <span>Ship To</span>
                  <p>{order.customerName}</p>
                </div>
                <div className="OrderPay">
                  <span>Mode Of Payment</span>
                  <p>Cash on delivery</p>
                </div>
              </div>
            </div>
            <div className="orderhistoryproduct">
              <h3>Delivered {order.updatedAt}</h3>
              {order.products.map((product) => (
                <ProductOrder product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '90%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: '#ccc', height: '85%' }}
      >
        <Tab label="Overview" {...a11yProps(0)} sx={{ marginLeft: '-60px', marginTop: '20px', marginBottom: '20px', paddingBottom: '20px', borderBottom: 1, borderColor: 'divider' }} />
        <Tab label="Order History" {...a11yProps(1)} sx={{ marginLeft: '-16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: 1, borderColor: 'divider' }} />
        <Tab label="Addresses" {...a11yProps(3)} sx={{ marginLeft: '-48px', marginBottom: '20px', paddingBottom: '20px', borderBottom: 1, borderColor: 'divider' }} />
        <Tab label="Profile" {...a11yProps(4)} sx={{ marginLeft: '-75px', marginBottom: '20px', paddingBottom: '20px', borderBottom: 1, borderColor: 'divider' }} />
        <Tab label="Terms of Use" {...a11yProps(5)} sx={{ marginLeft: '-30px', marginBottom: '20px', paddingBottom: '20px', borderBottom: 1, borderColor: 'divider' }} />
        <Tab label="Privacy Policy" {...a11yProps(6)} sx={{ marginLeft: '-18px' }} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <div className='UserOverview'>
          <div className="UserInfo">
            <img src={user.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
            <div>
              <h3>{user.username}</h3>
            </div>

            <div>
              {/* <button>Edit Profile</button> */}
            </div>
          </div>
        </div>
        <div className="UserOverviewGrid">
          <div className="OverviewGirdBox">
            <i><FaBoxOpen /></i>
            <h3>Orders</h3>
            <span>Check your order status</span>
          </div>
          <div className="OverviewGirdBox">
            <i><FaShoppingBag /></i>
            <h3>Wishlist</h3>
            <span>Check your order status</span>
          </div>
          <div className="OverviewGirdBox">
            <i><FaAddressBook /></i>
            <h3>Addresses</h3>
            <span>Check your order status</span>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <h1>Your Orders</h1>
          {console.log("hello")}
          {PrevHistCarts()}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="UserAddress">
          <div className='AddressHeading'>
            <h3>Saved Addresses</h3>
            <button onClick={handleClickOpen}>+ Add New Addresses</button>
            {popup ?
              <div className="addnewaddress-main">
                <div className="addnewaddress">
                  <div className="addnewaddress-header">
                    <img src="https://img.freepik.com/free-icon/placeholder_318-903608.jpg" alt="" />
                    <h1>Add New Address</h1>
                    <h2 onClick={closePopup}>X</h2>
                  </div>
                  <div className='addnewaddress-content-container'>
                    <div className='addnewaddress-content'>
                      <div className="input-group">
                        <span className="label">Name</span>
                        <input autocomplete="off" name="name" className="input" type="text" onChange={getData} />
                        <div></div>
                      </div>
                    </div>
                    <div className='addnewaddress-content'>
                      <div className="input-group">
                        <span className="label">Address</span>
                        <input autocomplete="off" name="address" className="input" type="text" onChange={getData} />
                        <div></div>
                      </div>
                    </div>
                    <div className='addnewaddress-content'>
                      <div className="input-group">
                        <span className="label">Mobile No</span>
                        <input autocomplete="off" name="mobile" className="input" type="number" onChange={getData} />
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <button className='addnewaddressSubBtn'>Submit</button>
                </div>
              </div> : ""}
          </div>
          <div>
            <UserAddressBox />
            <UserAddressBox />
            <UserAddressBox />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className='UserProfile'>
          <h1>Profile Details</h1>
          <div className="ProfileInfo">
            <img src={user.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
            <div className='Profile'>
              <h3>Name</h3>
              <span>{user.username}</span>
            </div>
            <div className='Profile'>
              <h3>Mobile No</h3>
              <span>{user.phone}</span>
            </div>
            <div className='Profile'>
              <h3>Email Id</h3>
              <span>{user.email}</span>
            </div>
            <div className='Profile'>
              <h3>Location</h3>
              <span>{user.city}, {user.country}</span>
            </div>

            <div>
              <button onClick={handleClickOpen}>Edit Profile</button>
              {popup ?
                <div className="addnewaddress-main">
                  <div className="addnewaddress">
                    <div className="addnewaddress-header editheader">
                      <img className='editheadderprofimg' src={user.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                      <h1>Edit Profile</h1>
                      <img className='closecircleXmarkprof' src="https://www.svgrepo.com/show/378998/circle-xmark.svg" onClick={closePopup} alt="" />
                    </div>
                    <div className='addnewaddress-content-container'>
                      <div className='addnewaddress-content'>
                        <div className="input-group">
                          <span className="label">Name</span>
                          <input autocomplete="off" name="username" className="input" type="text" onChange={getData} />
                          <div></div>
                        </div>
                      </div>
                      <div className='addnewaddress-content'>
                        <div className="input-group">
                          <span className="label">Email</span>
                          <input autocomplete="off" name="email" className="input" type="email" onChange={getData} />
                          <div></div>
                        </div>
                      </div>
                      <div className='addnewaddress-content'>
                        <div className="input-group">
                          <span className="label">Mobile No</span>
                          <input autocomplete="off" name="phone" className="input" type="number" onChange={getData} />
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <button className='EditProfBtn' onClick={addData}>Submit</button>
                  </div>
                </div> : ""}
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <section id="terms-of-service">
          <div className="termCard">
            <h1 className="primary-heading">Terms of Service</h1>
            <p className="paragraph">
              1) In consideration of your use of the beCoditive API, you represent that you <span className="bold">are</span> of legal age to form a binding contract and are <span className="bold">not</span> a person barred from receiving services under the laws of the Indian Constitution or other applicable jurisdiction. You also agree to: <br /> <br />
              • provide true, accurate, current and complete information about yourself as prompted by beCoditive API's registration form and; <br /> <br />
              • maintain and promptly update the Registration Data to keep it true, accurate, current and complete. If you provide any information that is untrue, inaccurate, not current or incomplete, or beCoditive has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, beCoditive has the right to suspend or terminate your account and refuse any and all current or future use of the beCoditive API (or any portion thereof).
              <br /><br /><br />
              2) Any kind of abusing, harassment using beCoditive API is <span className="bold">strictly prohibited</span>. If anyone is found conducting such acts, they will be <span className="bold">banned</span> from the beCoditive API and legal action will be taken against them.
              <br /><br /><br />
              3) beCoditive API provides <span className="bold">ONE</span> API key to each person. Trying to generate fakes API keys is strictly <span className="bold">prohibited</span> and this act will result in <span className="bold">banning</span> of the person.
              <br /><br /><br />
              4) beCoditive API is <span className="bold">copyrighted</span> and if any acts of <span className="bold">plagiarism</span> are discovered, legal action will be taken against the offender.
              <br /><br /><br />
              5) Flooding beCoditive API with false requests and false complains is <span className="bold">strictly prohibited</span>
              <br /><br /><br />
              6) Registration Data and certain other information about you <span className="bold">is subject</span> to our Privacy Policy.
              <br /><br /><br />
              7) You expressly <span className="bold">understand</span> and <span className="bold">agree</span> that beCoditive and its subsidiaries, affiliates, officers, employees, agents, partners and licensors shall not be liable to you for any direct, indirect, incidental, special, consequential or exemplary damages, including, but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if beCoditive has been advised of the possibility of such damages), resulting from the use or the inability to use beCoditive API.
              <br /><br /><br />
              8) You <span className="bold">agree</span> that beCoditive may <span className="bold">terminate</span> your access to beCoditive API for violations of the TOS and/or requests by authorized law enforcement or other government agencies.
              <br /><br /><br />
              9) You acknowledge that beCoditive may establish general practices and limits concerning use of beCoditive API, including without limitation the maximum number of days that email messages, message board postings or other uploaded Content will be retained by beCoditive API. You further acknowledge that beCoditive reserves the right to modify these general practices and limits from time to time. beCoditive reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, beCoditive API (or any part thereof) with or without notice. You agree that beCoditive shall not be liable to you or to any third party for any modification, suspension or discontinuance of beCoditive API.
            </p>
            <p className="footer-heading">© Copyright 2023 Urban Garden. All rights reserved.</p>
          </div>

        </section>

      </TabPanel>
      <TabPanel value={value} index={5}>
        <div className="privacyPolicy">
          <h1>Privacy Policy</h1>
          <p>Last updated February 2015.
            <br /><br />
            Welcome to DeViine.com (the "Site"), provided by DeViine LLC, and its affiliates, subsidiaries, parent company and other related companies ("Us", "We", or "DeViine"). This DeViine.com Privacy Policy ("Policy") describes the information we gather from you when you use the Site, mobile applications, and related services (together, the "Services") and how we use, process, and disclose that information. We may add to this Policy with other notices. We may also post additional privacy statements for some portions of the Services. By submitting personal information through our Services, you expressly consent to the transfer of your personal data to our servers in the U.S. for our collection, use, and disclosure in accordance with this Policy.</p>
          <h2>Information We Collect</h2>
          <p>When you create an account and use our Service, we collect the following types of information from you:
            <br /><br />
            1. Name;<br />
            2. Contact information such as your email address and phone number;<br />
            3. Demographics information such as your gender and location;<br />
            4. Any other information, such as reviews, content, and bio, you provide us.<br />
            If you create an account using, or otherwise connect your account to, a social networking services account (e.g. Twitter or Facebook), we may also collect information provided to us by such social networking service including for example your: name; email address; birthday; geographic location; interests; profile picture; gender; networks; user ID; list of friends; and any information you have made public on such social networking account.
            <br /><br />
            We automatically collect information about how you use our services, for example, pages you have viewed. We also collect certain technical information about your device including your Internet protocol address, geo-location information, your browser type, language and identifying information, your operating system and application version, device types, device model and manufacturer, device identifiers, and your device operating system type and version.
            <br /><br />
            We also use cookies, Web beacons, and URL information to gather information regarding the date and time of your visit and the information for which you searched and which you viewed. Cookies are small pieces of information that a website sends to your computer's hard drive while you are viewing a website. We may use both session cookies (which expire once you close your web browser) and persistent cookies (which usually stay on your computer until you delete them) to provide you with a more personal and interactive experience on our Site. Web beacons are digital images that are used to log information on the Services or in our emails. We use Web beacons to manage cookies, count visits, and to learn what marketing works and what does not. We also use Web beacons to tell if you open or act on our emails.
            <br /><br />
            Others, including third party analytics service providers and advertising partners may also collect personally identifiable information about your online activities over time and across different Web sites when you use our Services, including as described in this Privacy Policy. This Policy does not apply to and we are not responsible for those other parties. Third party analytics services may use cookies and web beacons through our Site (for example Google Analytics) to provide us with information about how you use and interact with our Site. We encourage you to review the privacy policies of these third parties to learn about your choices about information they collect from you.</p>
          <h2>Sharing Of Your Information</h2>
          <p>The DeViine Services may allow you to connect and share your actions, comments, content, profile, and information publicly or with other people. Please be mindful of your own privacy needs as you choose who to connect with and what to share and make public. We cannot control the privacy or security of information you choose to make public or share with others.
            <br /><br />
            The Services may also provide you with the option to share certain information from your DeViine account with social networking services like Facebook, Google, or Twitter. We are not responsible for the use or re-sharing by others of any of your information once it is made public. If you do not want your information to be made public, you should not use the DeViine Services in this manner and/or you should adjust your privacy settings on the applicable social networking service accordingly. We are not responsible for and we do not control these social networking services privacy practices. Please review the applicable privacy policy for information about how they use your information.</p>
          <h2>How we Use Your Information</h2>
          <p>We generally use your information to:
            <br /><br />
            Facilitate the creation of and secure your account on the Services;
            Identify you as a user in our system;
            Provide, personalize, and improve the Services;
            Communicate with you about your use of the Services;
            Develop new products and services,
            Customize the advertising you view and recommend content;
            Fulfill your requests;
            Send newsletters, surveys, offers and promotional materials related to the Services and for other marketing purposes of DeViine using your contact information;
            Protect, investigate, and prevent potentially fraudulent, unauthorized, or illegal activities;
            Protect our rights and the rights of other users; and
            As otherwise described in this Privacy Policy or in notices we provided to you.
            We may also use your information to verify your geographic location. We may use your geographic location data to personalize our Service, to recommend content, determine whether the information you have requested is available in your location.</p>
          <h2>How we Disclose Your Information</h2>
          <p>We may share your information as follows:
            <br /><br />
            1. We may share your personal information with your consent or at your direction.
            2. We may also share your information with others who perform services on our behalf.
            3. We may disclose your information if we believe we are required to do so by law, or to comply with a court order, judicial or other government subpoena, or warrant.
            4. We also may disclose your information if we believe doing so is appropriate or necessary to prevent any liability, or fraudulent, abusive, or unlawful uses or to protect DeViine and our Services; or any rights, property, or personal safety of DeViine or others.
            5. In the event that DeViine is or may be acquired by or merged with another company or involved in any other business deal (or negotiation of a business deal) involving sale or transfer of all or part of our business or assets, we may transfer or assign your information as part of or in connection with the transaction. Finally, in the event of insolvency, bankruptcy, or receivership, information may be transferred as a business asset.
            We may also share aggregated and anonymized data with our partners, advertisers, and other third parties.</p>
          <h2>Security</h2>
          <p>DeViine takes commercially reasonable steps to help protect your Information against loss, misuse and unauthorized access, or disclosure. No company can fully prevent security risks, however. While we strive to protect your personal information, we cannot guarantee its absolute security. To help protect yourself and your information, choose a unique password for our Services and do not use a password on our Services that you would use on any other website or online service.</p>
          <h2>Dispute Resolution</h2>
          <p>If you believe that DeViine has not adhered to this Statement, please contact DeViine by e-mail at support@deviine.com. We will do our best to address your concerns. If you feel that your complaint has been addressed incompletely, we invite you to let us know for further investigation.</p>
          <h2>Information Choices</h2>
          <p>You may opt out of receiving promotional emails from DeViine by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as emails about your accounts or our ongoing business relations. You may also send requests about your personal information, including changes to your contact preferences, changes to or deletions of your information or content you post, and requests to opt-out of sharing your personal information with third parties by emailing support@deviine.com. Please note that deletion of your information or content does not ensure complete or comprehensive removal of the content or information posted on the Services.
            <br /><br />
            When you visit the Site, we and others give you the following choices about use of mechanisms for tracking, including tracking of your online activities over time and across different websites and online services by third parties. Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies from our Site or from third parties. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Site. To opt-out of Google Analytics web tracking for certain browsers, you can download Google Analytics Opt-out Browser Add-on. You may opt out of other cookies that may be present on the Site by following the directions on Google's opt-out page. However, while we and others give you choices as described in this policy, there are many ways in which Web browser signals and other similar mechanisms can indicate your choice to disable tracking, and our Site may not be aware of or honor every mechanism.
            <br /><br />
            You may have the right to know what personal information DeViine has about you and to correct any inaccuracies. Please direct any such requests by email to support@deviine.com or by one of the other means listed below.</p>
          <h2>Changes and Updates to this Privacy Policy</h2>
          <p>From time to time, we may revise the Policy. To help you stay current of any changes, we note the date the Privacy Policy was last updated above.</p>
          <h2>Contact Information</h2>
          <p>Please contact DeViine with any questions or comments about this Policy, your information, our third-party disclosure practices, or your consent choices.
            <br /><br />
            DeViine LLC<br />
            28 W. 3rd Avenue, Suite B-1<br />
            Spokane, WA 99201<br />
            Telephone: 509-232-0810<br />
            Email: support@deviine.com</p>
        </div>
      </TabPanel>
    </Box>
  );
}
