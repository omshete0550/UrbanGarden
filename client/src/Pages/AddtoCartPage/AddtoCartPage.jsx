import React from 'react'
import Header from '../../Components/Header/Header'
import AddtoCartItem from '../../Components/AddtoCartItem/AddtoCartItem'
import SummaryItem from '../../Components/AddtoCartItem/SummaryItem'
import './AddtoCartPage.css'
import {cartData} from '../../Components/data'
const AddtoCartPage = () => {
  const cartItem = cartData.map((item) => 
        <AddtoCartItem title={item.title} key={item.id} url={item.url} nurseryowner={item.nurseryowner} />
    )
  return (
    <div>
      <Header/>
      <div className="addCartLayout">
            <div className="cartItems">
              {cartItem}
            </div>
            <div className="summaryItems">
                <SummaryItem/>
            </div>
      </div>
    </div>
  )
}

export default AddtoCartPage
