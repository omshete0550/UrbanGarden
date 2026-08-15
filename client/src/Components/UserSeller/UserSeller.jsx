import React, { useState } from "react";
import "./UserSeller.css";
import { Link } from "react-router-dom";
import { userSeller1, userSeller2 } from "../../assets";

const UserSeller = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };
  return (
    <>
      <h1 className="userSellerheading">Join Us</h1>
      <section className="UserSeller" id="userSeller">
        <div className="container">
          <div className={`user ${isSignIn ? "signinBx" : "signupBx"}`}>
            <div className="imgBx">
              <img src={userSeller1} alt="" />
            </div>
            <div className="formBx">
              <form action="" onSubmit={() => false}>
                <h2>
                  {isSignIn ? "Are You a Nursery Owner" : "Create an account"}
                </h2>

                <Link to="/register">
                  <input
                    type="submit"
                    name=""
                    value={isSignIn ? "Sign Up" : "Sign Up"}
                  />
                </Link>
                <p className="signup">
                  {isSignIn ? "Are you a User?" : "Already have an account ?"}
                  <Link to="/" onClick={toggleForm}>
                    {isSignIn ? "Click Here" : "Sign in."}
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className={`user ${isSignIn ? "signupBx" : "signinBx"}`}>
            <div className="formBx">
              <form action="" onSubmit={() => false}>
                <h2>Are You a User?</h2>
                <input type="submit" name="" value="Sign Up" />
                <p className="signup">
                  Are You a Nursery Owner ?
                  <Link to="/" onClick={toggleForm}>
                    Click Here
                  </Link>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img src={userSeller2} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserSeller;
