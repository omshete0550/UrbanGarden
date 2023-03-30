import React from 'react'
import './UserAddressBox.css'

const UserAddressBox = () => {
  return (
    <>
        <div className="addressbx">
            <div className='addressbxcontent'>
                <h4>Angela Yu</h4>
                <p>
                205, Govind dham tower, complex, Badlapur (west) <br />
                Manjarli<br />
                Mumbai - 421503<br />
                Maharashtra<br />
                </p>
                <span>Mobile: 7798283084</span>
            </div>
            <div className="addressbxfooter">
                {/* <div className="editaddr">
                    <button>Edit</button>
                </div> */}
                <div className="removeaddr">
                    <button>Remove</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserAddressBox