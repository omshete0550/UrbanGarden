import React, { useState } from 'react'
import './SingleNurseryInfo.css'
import { FaStar } from 'react-icons/fa'
import Tablist from '../../Components/TabLists/Tablist'
import StandardImageList from '../../Components/StandardImageList/StandardImageList'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

const SingleNurseryInfo = (props) => {
  const nurseryId = props.nursery
  const { data, loading } = useFetch(`/nurserys/${nurseryId}`);
  const [popup, setPop] = useState(false);
  const handleClickOpen = () => {
    setPop(!popup)
  }

  const closePopup = () => {
    setPop(false)
  }

  const [inpVal, setInpVal] = useState({
    name: "",
    city: "",
    time: "",
    address: "",

  })

  const [Data, setData] = useState([]);

  const getData = (e) => {
    const { value, name } = e.target;

    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value
      }
    })
  }

  const addData = (e) => {

    e.preventDefault();
    //   console.log(inpVal)

    const { name, city, time, address } = inpVal;

    if (name === "") {
      alert("Please enter your name");
    }
    else if (city === "") {
      alert("Please enter your city");
    }
    else if (time === "") {
      alert("Please enter your nursery time");
    }
    else if (address === "") {
      alert("Please enter your address");
    }
    else {
      localStorage.setItem("EditNurseryProfile", JSON.stringify([...Data, inpVal]));
    }
  };


  return (
    <>
      <div className="SingleNurInfo">

        <div className="NameRev">
          <h2>{data.address}</h2>
          <div className="cusRev">
            <span className='RevBx'>{data.rating}<i><FaStar /></i></span>
            <button className='EditProBtn' onClick={handleClickOpen}> Edit Profile </button>
            <div>
              {popup ?
                <div className="popup-main">
                  <div className="popup">
                    <div className="popup-header">

                      <img className='userimgEditProf' src={data.photos[0]} alt="" />
                      <img className='pencilEditProf' src="https://cdn-icons-png.flaticon.com/512/61/61456.png" alt="" />

                      <div>
                        <h1>Edit Nursery Profile</h1>
                        <p>Fill this form to Edit your Profile!</p>
                      </div>

                      <img className='closecircleXmark' src="https://www.svgrepo.com/show/378998/circle-xmark.svg" onClick={closePopup} alt="" />

                    </div>
                    <div className='popup-content-container'>
                      <div className='popup-content'>
                        <div class="form__group field">
                          <input required="" placeholder="Name" name='name' class="form__field" type="input" onChange={getData} />
                          <label class="form__label" for="name">Name</label>
                        </div>
                      </div>
                      <div className='popup-content'>
                        <div class="form__group field">
                          <input required="" placeholder="Name" name='time' class="form__field" type="number" onChange={getData} />
                          <label class="form__label" for="name">Time</label>
                        </div>
                      </div>
                      <div className='popup-content'>
                        <div class="form__group field">
                          <input required="" placeholder="Name" name='city' class="form__field" type="input" onChange={getData} />
                          <label class="form__label" for="name">City</label>
                        </div>
                      </div>
                      <div className='popup-content'>
                        <div class="form__group field">
                          <input required="" placeholder="Name" name='address' class="form__field" type="input" onChange={getData} />
                          <label class="form__label" for="name">Address</label>
                        </div>
                      </div>
                    </div>
                    <button className='popupSubBtn' onClick={addData}>Submit</button>
                  </div>
                </div> : ""}
            </div>
          </div>
        </div>

        <div className="NurInfo">
          <span>{data.desc}</span>
          <span>{data?.city}</span>
          <span>Open now 11am - 6pm</span>
        </div>

        <div className="ThreeBtn">
          <button className='BOOKMARK'> Direction </button>
          <button className='BOOKMARK'> Bookmark </button>
          <button className='BOOKMARK'> Share </button>
          <Link to='/AddProductControl'><button className='BOOKMARK'> Add Product </button></Link>
        </div>

        <StandardImageList />
      </div>

      <Tablist data={data} />
    </>
  )
}

export default SingleNurseryInfo