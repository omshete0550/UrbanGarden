import React from 'react'
import Product from '../Carousel/Product'
// import { productData } from '../Carousel/data';
import { FaAngleDoubleRight } from 'react-icons/fa';
import "./GridCateg.css"
import useFetch from '../../hooks/useFetch';

const GridCateg = (props) => {
  const category = props.gridheading
  const { data, loading } = useFetch(`/products?category=${category}`);
  const product = data?.map((item) =>
    <Product name={item.name} url={item.photos[0]} key={item._id} price={item.price} description={item.desc} idx={item._id} />
  )
  return (
    <div >
      <h1 className='gridheading'>{category.toUpperCase()} <FaAngleDoubleRight style={{ paddingTop: "10px" }} /></h1>
      {loading ? "Loading" : (
        <div className="parentGrid">
          {product}
        </div>
      )}
    </div>
  )
}

export default GridCateg
