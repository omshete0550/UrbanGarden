import React from "react";
import "./UserProfile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import VerticalTabs from "../../Components/VerticalTabPanel/TabPanel";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();

  const { data, loading, error } = useFetch(`/users/${username}`);

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

          {loading ? (
            <div className="profile-loading">
              Loading your garden profile...
            </div>
          ) : error ? (
            <div className="profile-loading">Unable to load your profile.</div>
          ) : !data ? (
            <div className="profile-loading">User profile not found.</div>
          ) : (
            <VerticalTabs user={data} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UserProfile;
