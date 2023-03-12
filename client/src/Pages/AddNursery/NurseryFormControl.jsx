import React from 'react'
import NurseryForm from './NurseryForm'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const NurseryFormControl = () => {
  return (
    <>
        <Container >
            <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', marginTop: '5%', padding: '40px 80px', marginBottom: '5%' }}>
            <NurseryForm />
            </Box>
        </Container>
    </>
  )
}

export default NurseryFormControl