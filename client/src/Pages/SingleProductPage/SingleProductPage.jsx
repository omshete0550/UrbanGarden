import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import ProductLayout from '../../Components/SingleProductLayout/ProductLayout'
const SingleProductPage = () => {
  const location = useLocation()
  let productId = location.pathname.split('/')[3]
  if (productId === "Products") {
    productId = location.pathname.split('/')[4]
  }
  return (
    <div>
      <Header />
      <ProductLayout product={productId} />
    </div>
  )
}

export default SingleProductPage

