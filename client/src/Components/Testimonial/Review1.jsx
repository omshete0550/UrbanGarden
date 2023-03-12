import React from 'react'
import './Testimonial.css'
const Review1 = (props) => {
  return (
    <>
        <div className="review1">
        <div className="rev_content1">
        <p>{props.content}</p>
        </div>
        <div className="rev_user1">
            <img src={props.image} alt="" />
            <div className="rev_user_content1">
                <h3>{props.name}</h3>
                <span>{props.email}</span>
            </div>
        </div>         
        </div>
    </>
  )
}

export default Review1