import React, { useState } from 'react';
import './UserSeller.css';

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
                        <h1>Are You a User?</h1>
                        <button className="button-91">Sign Up</button>
                    </div>
                </div>
                <div className="page front">
                    <div className="content">
                        <h1>Wanna add You're own nursery?</h1>
                        <button className="button-91" onClick={handleRegisterClick}>Click here</button>
                    </div>
                </div>
                <div className="page back">
                    <div className="content">
                        <h1>Hello, friend! Wanna buy awesome plants?</h1>
                        <button className="button-91" onClick={handleLoginClick}>Click here</button>
                    </div>
                </div>
                <div className="Seller">
                    <div className="content">
                        <img src="https://thumbs.dreamstime.com/b/flower-home-plant-store-vector-illustration-flower-home-plant-store-170103072.jpg" alt="" />
                        <h1>Are You a User?</h1>
                        <button className="button-91">Add a Nursery</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserSeller