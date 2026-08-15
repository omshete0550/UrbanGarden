import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";

const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [location, setLocation] = useState(null);
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    city: undefined,
    country: undefined,
    phone: undefined,
    password: undefined,
    isAdmin: false,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChange1 = (e) => {
    const { id, value, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: id === "isAdmin" ? checked : value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, credentials);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=jsonv2`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let city = data.display_name;
          const country = data.address?.country;

          if (data.address?.city) {
            city = data.address.city;
          } else if (data.address?.town) {
            city = data.address.town;
          } else if (data.address?.village) {
            city = data.address.village;
          } else if (data.address?.county) {
            city = data.address.county;
          }

          setCredentials((prev) => ({ ...prev, city, country }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  return (
    <div className="RegisterDiv">
      <div className="register">
        <div className="image" aria-hidden="true">
          <img
            src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1696405394-plant-pot-stand-651d1780a4081.png?crop=1.00xw:0.856xh;0,0.0792xh&resize=980:*"
            alt=""
          />
          <div className="auth-image-copy">
            <span className="auth-pill">
              <FaLeaf /> UrbanGarden
            </span>
            <h2>Start selling, shopping, and growing locally.</h2>
          </div>
        </div>

        <div className="details">
          <span className="auth-kicker">Create account</span>
          <h1 className="title">Sign Up</h1>
          <p className="auth-subtitle">
            Join UrbanGarden to discover nearby plants, tools, and nurseries.
          </p>

          <div className="input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <label htmlFor="phone">Phone No</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your number"
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <div className="NurseryOwnerChk">
            <label htmlFor="isAdmin">
              <input type="checkbox" id="isAdmin" onChange={handleChange1} />
              I am a nursery owner
            </label>
          </div>

          <button
            disabled={isFetching}
            className="register-button"
            onClick={handleClick}
          >
            {isFetching ? "Creating account..." : "Sign Up"}
          </button>

          {error && (
            <span className="auth-error">
              Registration failed. Please try again.
            </span>
          )}

          <Link to={"/login"}>
            <span className="signup">Already have an account? Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
