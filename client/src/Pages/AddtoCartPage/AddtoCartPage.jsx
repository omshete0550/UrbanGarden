import React from 'react'
import Header from '../../Components/Header/Header'
import AddtoCartItem from '../../Components/AddtoCartItem/AddtoCartItem'
import SummaryItem from '../../Components/AddtoCartItem/SummaryItem'
import './AddtoCartPage.css'
import { useSelector } from 'react-redux'

const AddtoCartPage = () => {

  const cart = useSelector((state) => state.cart);
  const cartData = cart.products;
  const cartItem = cartData.map((item) =>
    <AddtoCartItem product={item} />
  )

  return (
    <div>
      <Header />
      <div className="addCartLayout">
        <div className="cartItems">
          {cartItem}
        </div>
        <div className="summaryItems">
          <SummaryItem />
        </div>
      </div>
    </div>
  )
}

export default AddtoCartPage
