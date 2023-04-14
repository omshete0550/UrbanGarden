import React from 'react'
import{ useState } from "react";
import './AddtoCartItem.css'

const AddtoCartItem = (props) => {
  let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    if(count<0){
      count = 0;
      setCount(count);
    }
    else{
      setCount(count);
    }
    
  }
  return (
    <div>
      <div className="CartItem">
        <div className="itemImage">
            {/* <img src="https://5.imimg.com/data5/DT/NN/PM/SELLER-46366228/rose-tree-500x500.jpg" alt="" width={200} height={200} /> */}
            <img src={props.url} alt="" width={200} height={200} />
        </div>
        <div className="itemDetails">
            <div className="headeritem">
              {/* <h2>Rose Plant</h2> */}
              <h2>{props.title}</h2>
              {/* <p><i>by Apna Nursery</i></p> */}
              <p><i>by {props.nurseryowner}</i></p>
            </div>
            <div className="sizeitem">
              <p>SIZE: </p>
              <p>Medium</p>
            </div>
            <div className="dimensionitem">
              <p>DIMENSIONS: </p>
              <p>25cm x 30cm x 45cm</p>
            </div>
            <div className="removeitem">
              <button className='removebtnitem'>DISCARD ITEM</button>
              <button className='movewishbtnitem'>MOVE TO WISHLIST</button>
            </div>
        </div>
        <div className="itemPricing">
            <div className="noofItems">
              <button onClick={incrementCount}>+</button>
              <div>{count}</div>
              <button onClick={decrementCount}>-</button>
            </div>
            <div className="mrpitem">
              <p> $156.41</p>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default AddtoCartItem
