import React from 'react'
import Product from '../Carousel/Product'
// import { productData } from '../Carousel/data';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { productData } from '../data';
import CategoryBox from '../Category/CategoryBox';
import "./GridCateg.css"

const GridCateg = (props) => {
    const product = productData.map((item) => 
        <Product name={item.name} url={item.imageurl} key={item.id} price={item.price} description = {item.description} />
    )
  return (
    <div >
    <h1 className='gridheading'>{props.gridheading} <FaAngleDoubleRight style={{paddingTop:"10px"}}/></h1>
      <div className="parentGrid">
        {product}
      </div>
    </div>
  )
}

export default GridCateg
