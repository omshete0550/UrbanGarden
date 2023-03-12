import React, { useState } from 'react';
import './UserSeller.css';
// import User from '../assets/User.jpg';

const UserSeller = () => {

    const [containerClass, setContainerClass] = useState('');

  const handleRegisterClick = () => {
    setContainerClass('active');
  };

  const handleLoginClick = () => {
    setContainerClass('close');
  };

  return (
    <>
        <div id="Usercontainer" className={containerClass}>
            <div className="User">
                <div className="content">
                    {/* <img src={ User } alt="" /> */}
                    <h1>Are You a User?</h1>
                    <button class="button-91" role="button">Sign Up</button>
                </div>
            </div>
            <div className="page front">
                <div className="content">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <line x1="20" y1="8" x2="20" y2="14" />
                            <line x1="23" y1="11" x2="17" y2="11" />
                        </svg> */}
                        <h1>Wanna add You're own nursery?</h1>
                        <button class="button-91" role="button" onClick={handleRegisterClick}>Click here</button>
                </div>
            </div>
            <div className="page back">
                <div className="content">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <line x1="20" y1="8" x2="20" y2="14" />
                            <line x1="23" y1="11" x2="17" y2="11" />
                        </svg> */}
                        <h1>Hello, friend! Wanna buy awesome plants?</h1>
                        <button class="button-91" role="button" onClick={handleLoginClick}>Click here</button>
                </div>
            </div>
            <div className="Seller">
                <div className="content">
                        <img src="https://thumbs.dreamstime.com/b/flower-home-plant-store-vector-illustration-flower-home-plant-store-170103072.jpg" alt="" />
                        <h1>Are You a User?</h1>
                        <button class="button-91" role="button">Add a Nursery</button>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default UserSeller