import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import ProductLayout from '../../Components/SingleProductLayout/ProductLayout'
import axios from 'axios'

const SingleProductPage = () => {
  const [images, setImages] = React.useState([])
  const [data, setData] = React.useState([])
  const location = useLocation()
  let productId = location.pathname.split('/')[3]
  if (productId === "Products") {
    productId = location.pathname.split('/')[4]
  }
  const fetching = async () => {
    const res = await axios.get(`/products/${productId}`)
    setData(res.data)
    setImages(res.data.photos)
  }
  React.useEffect(() => {
    fetching()
  }, [location])

  return (
    <div>
      <Header />
      <ProductLayout data={data} image={images} />
    </div>
  )
}

export default SingleProductPage

