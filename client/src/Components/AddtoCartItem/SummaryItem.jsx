import React from 'react'
import './SummaryItem.css'
const SummaryItem = () => {
  return (
    <div>
      <div className="summarycontainer">
        <div className="headingsummary">
            <h2>INVOICE</h2>
        </div>
        <div className="itemList">
            <div className="item">
                <div className="quantityList">
                    <p>3 X</p>
                    <p>3 X</p>
                    <p>3 X</p>
                    <p>3 X</p>

                </div>
                <div className="titleList">
                    <p>Rose Plant</p>
                    <p>Rose Plant</p>
                    <p>Rose Plant</p>
                    <p>Rose Plant</p>
                </div>
                <div className="priceList">
                    <p>$156.41</p>
                    <p>$156.41</p>
                    <p>$156.41</p>
                    <p>$156.41</p>
                </div>
            </div>
        </div>
        <div className="delivery">
            <div className="deliverycharges">
                <p>Delivery Charges: </p>
                <p>FREE</p>
            </div>
        </div>
        <div className="totalcost">
            <p>Total Amount: </p>
            <p><b>$156.41</b></p>
        </div>
        <div className="checkout">
            <button className="checkoutbtn">GO TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default SummaryItem
