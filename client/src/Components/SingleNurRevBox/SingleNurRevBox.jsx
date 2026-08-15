import React from 'react'
import { FaUser, FaStar } from 'react-icons/fa';
import './SingleNurRevBox.css'

const SingleNurRevBox = () => {
  return (
    <>
        <div className="NurRevBx">
            <div className="RevUser">
                <i><FaUser /></i>
                <h4>Om Shete</h4>
            </div>
            <div className="RevRating">
                <span className='RevRatingBx'>2.2<i><FaStar /></i></span>
                <div className='RevStatus'>
                  <h5>Delivery</h5>
                  <h6>18 hours ago</h6>
                </div>
            </div>
            <div className='RevContent'>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ipsum doloribus nihil, exercitationem pariatur architecto distinctio omnis porro animi autem magni commodi inventore, saepe nobis!</p>
            </div>
            
        </div>
    </>
  )
}

export default SingleNurRevBox