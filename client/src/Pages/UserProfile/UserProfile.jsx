import React from 'react'
import './UserProfile.css';
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import VerticalTabs from '../../Components/VerticalTabPanel/TabPanel';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { data, loading, error } = useFetch("/users/" + user.details.username);

  return (
    <>
      <Header />
      <div className="verticalTabPanel">
        <div className='TabHeading'>
          <h4>Account</h4>
          <span>UG User</span>
        </div>
        {!data[0] ? "Loading" :
          <VerticalTabs user={data[0]} />
        }
      </div>
      <Footer />
    </>
  )
}

export default UserProfile