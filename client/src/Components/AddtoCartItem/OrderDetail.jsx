import { useState } from "react";
import './OrderDetail.css'
import { useSelector } from "react-redux";

const OrderDetail = ({ createOrder }) => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.currentUser);
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");

    const handleClick = () => {
        createOrder({
            customerName: user.details.username,
            customerId: user.details._id,
            products: cart.products.map((item) => {
                return {
                    productId: item._id,
                    postedBy: item.postedby,
                    quantity: item.quantity,
                };
            }),
            address: address,
            amount: cart.total,
            method: 0,
        });
    };

    return (
        <div className="containerdsh">
            <div className="wrapper">
                <h1 className="title">You will pay ₹100 extra after delivery.</h1>
                <div className="itemt">
                    {/* <label className="labelt">Name Surname</label> */}
                    <input
                        placeholder="John Doe"
                        type="text"
                        className="input"
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>
                <div className="itemt">
                    {/* <label className="labelt">Phone Number</label> */}
                    <input
                        type="text"
                        placeholder="+1 234 567 89"
                        className="input"
                    />
                </div>
                <div className="itemt">
                    {/* <label className="labelt">Address</label> */}
                    <textarea
                        rows={5}
                        placeholder="Elton St. 505 NY"
                        type="text"
                        className="textarea"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button className="button" onClick={handleClick}>
                    Order
                </button>
            </div>
        </div>
    );
};

export default OrderDetail;