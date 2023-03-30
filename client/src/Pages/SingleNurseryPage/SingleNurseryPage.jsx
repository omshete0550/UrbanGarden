import React from 'react'
import Footer from '../../Components/Footer/Footer'
import SingleNurseryInfo from '../SingleNurseryPage/SingleNurseryInfo'
import Header from '../../Components/Header/Header'
import { useLocation } from 'react-router-dom'

const SingleNurseryPage = () => {
  const location = useLocation()
  let nurseryId = location.pathname.split('/')[2]

  return (
    <>
      <Header />

      <SingleNurseryInfo nursery={nurseryId} />

      <Footer />
    </>
  )
}

export default SingleNurseryPage