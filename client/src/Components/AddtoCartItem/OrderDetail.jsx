import { useState } from "react";
import "./OrderDetail.css";
import { useSelector } from "react-redux";

const OrderDetail = ({ createOrder, onClose }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const products = Array.isArray(cart.products) ? cart.products : [];

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({
      customerName: customer || user?.details?.username,
      customerId: user?.details?._id,
      products: products.map((item) => ({
        productId: item._id,
        nurseryId: item.nurseryId,
        quantity: item.quantity,
      })),
      address,
      phone,
      amount: cart.total,
      method: 0,
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>Delivery Details</h2>
          <p>Enter your shipping information</p>
        </div>

        <div className="modalBody">
          <input
            placeholder="Full Name"
            className="input"
            onChange={(e) => setCustomer(e.target.value)}
          />

          <input
            placeholder="Mobile Number"
            className="input"
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Full Address"
            className="textarea"
            rows={4}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="modalFooter">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleClick}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

