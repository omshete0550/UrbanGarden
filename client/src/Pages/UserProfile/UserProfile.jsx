import React from 'react'
import './UserProfile.css';
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import VerticalTabs from '../../Components/VerticalTabPanel/TabPanel';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const UserProfile = () => {
  const location = useLocation()
  const name = location.pathname.split('/')[2]
  const { data, loading, error } = useFetch("/users/" + name);

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