import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import './ProductSlider.css'

const Product = (props) => {
  return (
    <div>
      <div className='card'>
        <img className='product--image' src={props.url} alt="productimage" />
        <div className="detail">
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </div>
        <div className="cart">
          <p className="price">{props.price}</p>
          <p>
            <button> <FaShoppingCart /> </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Product
