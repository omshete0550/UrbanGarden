import React from 'react'
import { useState } from "react";
import './AddtoCartItem.css'
import { FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../redux/slices/Cartslice';

const AddtoCartItem = (props) => {
  const product = props.product;
  let [count, setCount] = useState(product.quantity);
  const dispatch = useDispatch();
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    if (count < 0) {
      count = 0;
      setCount(count);
    }
    else {
      setCount(count);
    }
  }
  const handleremove = () => {
    dispatch(removeProduct(product._id));
  }

  return (
    <div>
      <div className="CartItem">
        <div className="itemImage">
          {/* <img src="https://5.imimg.com/data5/DT/NN/PM/SELLER-46366228/rose-tree-500x500.jpg" alt="" width={200} height={200} /> */}
          <img src={product.photos[0]} alt="" width={200} height={200} />
        </div>
        <div className="itemDetails">
          <div className="headeritem">
            {/* <h2>Rose Plant</h2> */}
            <h2>{product.name}</h2>
            {/* <p><i>by Apna Nursery</i></p> */}
            <p><i>by {product.postedby}</i></p>
          </div>
          <div className="sizeitem">
            <p>SIZE: </p>
            <p>{props.size}</p>
          </div>
          <div className="dimensionitem">
            <p>DIMENSIONS: </p>
            <p>{props.dimensions}</p>
          </div>
          <div className="removeitem">
            {/* <button className='removebtnitem'>DISCARD ITEM</button> */}
            <button className='movewishbtnitem'> <FaHeart /> | MOVE TO WISHLIST</button>
          </div>
        </div>
        <div className="itemPricing">
          <div className="noofItems">
            <button onClick={incrementCount}>+</button>
            <div>{count}</div>
            <button onClick={decrementCount}>-</button>
          </div>
          <div className="mrpitem">
            <p> {product.price}</p>
          </div>
          <div className="buttonremove">
            <button className='removebtnitem' onClick={handleremove}>X</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddtoCartItem
