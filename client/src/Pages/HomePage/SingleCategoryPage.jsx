import React from 'react'
import Header from '../../Components/Header/Header'
import SingleCategLayout from '../../Components/SingleCategLayout/SingleCategLayout'
const SingleCategoryPage = () => {
  return (
    <div>
        {/* NAVBAR  */}
          <Header />
        {/* NAVBAR  */}

        {/* Single Category Layout (Filters + Grid) */}
          <SingleCategLayout/>
        {/* Single Category Layout (Filters + Grid) */}
      
    </div>
  )
}

export default SingleCategoryPage
