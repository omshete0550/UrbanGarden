import React, { useState } from "react";
import "./Login.css";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
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
    <div className="LoginDiv">
      <div className="login">
        <div className="image" aria-hidden="true">
          <img
            src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1696405394-plant-pot-stand-651d1780a4081.png?crop=1.00xw:0.856xh;0,0.0792xh&resize=980:*"
            alt=""
          />
          <div className="auth-image-copy">
            <span className="auth-pill">
              <FaLeaf /> UrbanGarden
            </span>
            <h2>Grow your green space with trusted nurseries.</h2>
          </div>
        </div>

        <div className="details">
          <span className="auth-kicker">Welcome back</span>
          <h1 className="title">Log in</h1>
          <p className="auth-subtitle">
            Access your garden cart, saved nurseries, and plant care picks.
          </p>

          <div className="input">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isFetching}
            className="login-button"
            onClick={handleClick}
          >
            {isFetching ? "Logging in..." : "Log in"}
          </button>

          {error && (
            <span className="auth-error">
              Something went wrong. Please try again.
            </span>
          )}

          <Link to={"/Register"}>
            <span className="signup">New to UrbanGarden? Create an account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
