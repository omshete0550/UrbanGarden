import React from "react";
import { MapPin, Phone, Trash2 } from "lucide-react";
import "./UserAddressBox.css";

const addressData = {
  id: "addr_001",
  type: "Home Address",
  name: "John Doe",
  address: {
    line1: "123, Green Street",
    area: "Sector 5",
    locality: "Andheri West",
    city: "Mumbai",
    pincode: "421503",
    state: "Maharashtra",
  },
  mobile: "9874563231",
};

const UserAddressBox = () => {
  const address = addressData;

  return (
    <div className="address-card">
      <div className="address-card-header">
        <div className="address-type">
          <MapPin size={17} />
          <span>{address.type}</span>
        </div>

        <button className="edit-btn">Edit</button>
      </div>

      <div className="address-card-content">
        <h4>{address.name}</h4>

        <p className="address-text">
          {address.address.line1}
          <br />
          {address.address.area}
          <br />
          {address.address.locality}
          <br />
          {address.address.city} - {address.address.pincode}
          <br />
          {address.address.state}
        </p>

        <div className="phone-number">
          <Phone size={16} />
          <span>{address.mobile}</span>
        </div>
      </div>

      <div className="address-card-footer">
        <button className="remove-btn">
          <Trash2 size={16} />
          Remove Address
        </button>
      </div>
    </div>
  );
};

export default UserAddressBox;
