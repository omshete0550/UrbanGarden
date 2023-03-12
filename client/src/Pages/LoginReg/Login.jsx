import React, { useState } from 'react';
import './Login.css'
import { FaInstagram, FaGoogle, FaFacebook, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    return (
        <div className='LoignDiv'>
            <div className="login">
                <div className="image">
                    <img src="https://images.unsplash.com/photo-1625321643039-ed4aa7f9ceeb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMjgxMjM5OQ&ixlib=rb-1.2.1&q=85" alt="" />
                </div>
                <div className="details">
                    <h1 className="title">Log in</h1>
                    <div className="input">
                        <label htmlFor="">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input">
                        <label htmlFor="">Password</label>
                        <input
                            type="text"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button disabled={isFetching} className="login-button" onClick={handleClick}>Log in</button>
                    {error && <span>Something went wrong...</span>}
                    <span className="between-button">Or</span>
                    <div className="logOption">
                        <button className="facebook-button">
                            <i><FaFacebook /></i>
                        </button>
                        <button className="google-button">
                            <i><FaGoogle /></i>
                        </button>
                        <button className="instagram-button">
                            <i><FaInstagram /></i>
                        </button>
                    </div>
                    <span className="signup">Can’t log in? ∙<Link to={'/Register'}>Sign Up</Link></span>
                </div>
            </div>

        </div>
    );
}

export default Login;
