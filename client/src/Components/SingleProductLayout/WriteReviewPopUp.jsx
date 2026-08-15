import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import './WriteReviewPopUp.css'

const WriteReviewPopUp = (props) => {
    return (props.trigger) ? (
        <div>
            <div className="writereviewpopupbox">
                <div className="topwrite">
                    <h1>UrbanGarden</h1>
                    <button onClick={() => props.setTrigger(false)}>X</button>
                </div>

                <div className="identitylabel">
                    <div className="identityicon">
                        <p>IC</p>
                    </div>
                    <div className="identitydetails">
                        <h3>Hamza Ali Sayed</h3>
                        <p>Post Publicly</p>
                    </div>
                </div>
                <div className="doreview">
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating name="read-only" value={3} readOnly />
                    </Box>
                </div>
                <div className="typereview">
                    <textarea name="" id="" cols="45" rows="7"></textarea>
                </div>
                <div className="writereviewbuttons">
                    <div className="cancelbutton">
                        <button>CANCEL</button>
                    </div>
                    <div className="postbutton">
                        <button>POST</button>
                    </div>
                </div>
            </div>

        </div>
    ) : ""
}

export default WriteReviewPopUp
