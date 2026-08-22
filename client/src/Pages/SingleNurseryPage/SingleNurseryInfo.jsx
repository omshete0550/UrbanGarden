import React, { useState } from "react";
import "./SingleNurseryInfo.css";
import {
  FaBookmark,
  FaClock,
  FaDirections,
  FaMapMarkerAlt,
  FaPen,
  FaPlus,
  FaShareAlt,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import Tablist from "../../Components/TabLists/Tablist";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const SingleNurseryInfo = (props) => {
  const nurseryId = props.nursery;
  const { data, loading, error } = useFetch(`/nurseries/${nurseryId}`);
  const [popup, setPop] = useState(false);
  const handleClickOpen = () => {
    setPop(!popup);
  };

  const closePopup = () => {
    setPop(false);
  };

  const [inpVal, setInpVal] = useState({
    name: "",
    city: "",
    time: "",
    address: "",
  });

  const getData = (e) => {
    const { value, name } = e.target;

    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();
    //   console.log(inpVal)

    const { name, city, time, address } = inpVal;

    if (name === "") {
      alert("Please enter your name");
    } else if (city === "") {
      alert("Please enter your city");
    } else if (time === "") {
      alert("Please enter your nursery time");
    } else if (address === "") {
      alert("Please enter your address");
    } else {
      localStorage.setItem(
        "EditNurseryProfile",
        JSON.stringify([inpVal])
      );
    }
  };

  if (loading) {
    return <div className="SingleNurInfo">Loading nursery...</div>;
  }

  if (error) {
    return (
      <div className="SingleNurInfo">
        Unable to load this nursery. Please check that the API server is running
        and the nursery id is valid.
      </div>
    );
  }

  if (!data) {
    return <div className="SingleNurInfoState">Nursery not found.</div>;
  }

  const nurseryImage = Array.isArray(data.photos) ? data.photos[0] : "";
  const description = data.description || data.desc || "No description available yet.";
  const rating = data.rating || 0;

  return (
    <>
      <div className="SingleNurInfo">
        <section className="nurseryHero">
          <div className="nurseryHeroContent">
            <div className="nurseryEyebrow">
              <span className="statusDot" />
              Nursery profile
            </div>

            <div className="NameRev">
              <div>
                <h1>{data.name}</h1>
                <div className="ratingSummary">
                  <span className="ratingBadge">
                    {rating}
                    <FaStar />
                  </span>
                  <span className="ratingText">Customer rating</span>
                </div>
              </div>

              <button className="EditProBtn" onClick={handleClickOpen}>
                <FaPen />
                Edit Profile
              </button>
            </div>

            <div className="NurInfo">
              <p>{description}</p>
              <div className="infoMeta">
                <span>
                  <FaMapMarkerAlt />
                  {data.address || data.city || "Address not added"}
                </span>
                <span>
                  <FaClock />
                  Open now 11am - 6pm
                </span>
              </div>
            </div>

            <div className="ThreeBtn">
              <button>
                <FaDirections />
                Direction
              </button>
              <button>
                <FaBookmark />
                Bookmark
              </button>
              <button>
                <FaShareAlt />
                Share
              </button>
              <Link to="/AddProductControl">
                <button>
                  <FaPlus />
                  Add Product
                </button>
              </Link>
            </div>
          </div>

          <div className="heroImageWrap">
            {nurseryImage ? (
              <img src={nurseryImage} alt={data.name} />
            ) : (
              <div className="heroImageFallback">No nursery photo</div>
            )}
            <div className="heroImageOverlay" />
          </div>
        </section>

        {popup && (
          <div className="popup-main">
            <div className="popup editProfilePopup">
              <div className="popup-header">
                <div className="popup-avatar">
                  {nurseryImage ? (
                    <img
                      className="userimgEditProf"
                      src={nurseryImage}
                      alt={data.name}
                    />
                  ) : (
                    <div className="avatarFallback">UG</div>
                  )}
                  <span>
                    <FaPen />
                  </span>
                </div>

                <div className="popup-title">
                  <span className="popup-kicker">Nursery settings</span>
                  <h2>Edit Nursery Profile</h2>
                  <p>Update the details customers see on your nursery page.</p>
                </div>

                <button
                  className="editCloseBtn"
                  onClick={closePopup}
                  aria-label="Close edit profile"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="popup-content-container">
                <div className="formGrid">
                  <div className="form__group">
                    <span>Name</span>
                    <input
                      required
                      placeholder={data.name || "Nursery name"}
                      name="name"
                      type="text"
                      onChange={getData}
                    />
                  </div>
                  <div className="form__group">
                    <span>Time</span>
                    <input
                      required
                      placeholder="11am - 6pm"
                      name="time"
                      type="text"
                      onChange={getData}
                    />
                  </div>
                  <div className="form__group">
                    <span>City</span>
                    <input
                      required
                      placeholder={data.city || "City"}
                      name="city"
                      type="text"
                      onChange={getData}
                    />
                  </div>
                  <div className="form__group">
                    <span>Address</span>
                    <input
                      required
                      placeholder={data.address || "Address"}
                      name="address"
                      type="text"
                      onChange={getData}
                    />
                  </div>
                </div>

                <div className="popup-actions">
                  <button className="popupCancelBtn" onClick={closePopup}>
                    Cancel
                  </button>
                  <button className="popupSubBtn" onClick={addData}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Tablist data={data} />
    </>
  );
};

export default SingleNurseryInfo;


