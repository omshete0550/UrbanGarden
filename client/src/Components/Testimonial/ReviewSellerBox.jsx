import React from 'react';
import './TestimonialSeller.css';
import { FaStar } from 'react-icons/fa';

const ReviewSellerBox = (props) => {
  return (
    <>
        <div className="review">
            <div className="rev_content">
                <img src={props.image} alt="" />
                <div className="brandContent">
                    <h2>{props.brandName}</h2>
                    <span>{props.dateOfJoin}</span>
                    <p> <FaStar /> {props.rating} / 5</p>
                </div>  
            </div>

            <div className="rev_user">
                <div className="rev_user_content">
                    <p>"{props.content}"</p>
                </div>
            </div>   
            <div className='date'>
                {props.dateOfPost}
            </div>      
        </div>
    </>
  )
}

export default ReviewSellerBox