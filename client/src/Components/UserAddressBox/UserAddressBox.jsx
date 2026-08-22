import React from "react";
import { MapPin, Phone, Trash2, Pencil, Home } from "lucide-react";
import "./UserAddressBox.css";

const UserAddressBox = ({ user }) => {
  const address = {
    type: "Home",
    name: user?.username || "Garden User",
    line1: user?.address || "123, Green Street",
    area: user?.area || "Sector 5",
    locality: user?.locality || "Andheri West",
    city: user?.city || "Mumbai",
    pincode: user?.pincode || "421503",
    state: user?.state || "Maharashtra",
    mobile: user?.phone || "Not added",
  };

  return (
    <div className="ug-address-card">
      <div className="ug-address-top">
        <div className="ug-address-type">
          <span className="ug-address-type-icon">
            <Home size={16} />
          </span>

          <div>
            <span>Saved address</span>
            <strong>{address.type}</strong>
          </div>
        </div>

        <button
          type="button"
          className="ug-address-edit"
          aria-label="Edit address"
        >
          <Pencil size={15} />
          Edit
        </button>
      </div>

      <div className="ug-address-content">
        <h3>{address.name}</h3>

        <div className="ug-address-location">
          <MapPin size={17} />

          <p>
            {address.line1}
            <br />
            {address.area}
            <br />
            {address.locality}
            <br />
            {address.city} - {address.pincode}
            <br />
            {address.state}
          </p>
        </div>

        <div className="ug-address-phone">
          <Phone size={16} />
          <span>{address.mobile}</span>
        </div>
      </div>

      <div className="ug-address-footer">
        <button type="button" className="ug-address-remove">
          <Trash2 size={15} />
          Remove address
        </button>
      </div>
    </div>
  );
};

export default UserAddressBox;
