import React from 'react'
import FilterCateg from './FilterCateg'
import GridCateg from './GridCateg'
import "./SingleCateg.css"
import { useLocation } from 'react-router-dom';


const SingleCategLayout = () => {
  const location = useLocation()
  const categoryName = location.pathname.split('/')[2]

  return (
    <div >
        <div className="SingleCateg">
            <div className='filter'>
                <FilterCateg/>
            </div>
            <div className='grid'>
                <GridCateg gridheading={categoryName}/>
            </div>
        </div>
    </div>
  )
}

export default SingleCategLayout
