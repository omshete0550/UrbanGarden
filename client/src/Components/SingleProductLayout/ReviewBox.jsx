import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import './ProductLayout.css'
const ReviewBox = (props) => {
    const [value, setValue] = React.useState(3);
    return (
        <div>
            <div className="reviewCardProduct">
                <div className="reviewCardHeading">
                    <div className="reviewCardicon">
                        {/* <h1>IC</h1> */}
                        {/* <img src={props.url} alt="" /> */}
                    </div>
                    <div className="reviewCarddetails">
                        <h2>{props.name}</h2>
                        <div className="reviewCardrating">
                            <div className="reviewCardstarrating">
                                <h4>
                                    <Box
                                        sx={{
                                            '& > legend': { mt: 2 },
                                        }}
                                    >
                                        <Rating name="read-only" value={value} readOnly />

                                    </Box>
                                </h4>
                            </div>
                            <div className="reviewCarddate">
                                <h4>{props.datepost}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reviewcCardbody">
                    <p>{props.review}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReviewBox

