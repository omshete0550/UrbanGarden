import React from 'react'
import AddProductDetails from './AddProductDetails';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './AddProduct.css'

const AddProductControl = () => {
  return (
    <>
        {/* <Container sx={{display:'flex', flexDirection: 'column' ,marginTop: '2%', alignItems: 'center'}}>
            <h2 style={{textAlign: 'center', marginBottom: '5px', marginTop: '25px', fontSize: '40px'}}>Add Product Details</h2>
            <Box sx={{ background: '#ccc', height: '95vh', width: '80vw', marginTop: '3%', padding: '40px 80px', marginBottom: '5%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', borderRadius: '10px' }}>
                <AddProductDetails />
            </Box>
        </Container> */}
        <div className='MultiStepProduct'>
          <div className='AddBxPro'>
            <AddProductDetails />
          </div>
        </div>
    </>
  )
}

export default AddProductControl

