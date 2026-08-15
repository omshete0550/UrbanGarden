import React from "react";
import "./UserProfile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import VerticalTabs from "../../Components/VerticalTabPanel/TabPanel";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { data } = useFetch("/users/" + user.details.username);

  return (
    <>
      <Header />
      <main className="user-profile-page">
        <div className="profile-shell ug-container">
          <div className="TabHeading">
            <div>
              <span className="profile-kicker">Urban Garden Account</span>
              <h1>Profile</h1>
            </div>
            <p>Manage your orders, saved addresses, and account information.</p>
          </div>
          {!data[0] ? (
            <div className="profile-loading">Loading your garden profile...</div>
          ) : (
            <VerticalTabs user={data[0]} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserProfile;
