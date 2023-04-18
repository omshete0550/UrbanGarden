import React from 'react'
import './SummaryItem.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { reset } from "../../redux/slices/Cartslice";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";

const SummaryItem = () => {

    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.currentUser);

    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function redirection() {
        navigate("/Home");
    }
    const createOrder = async (data) => {
        try {
            const res = await axios.post("/orders", data);
            if (res.status === 201) {
                dispatch(reset());
                redirection()
            }
        } catch (err) {
            console.log(err);
        }
    };

    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    // style={style}
                    disabled={false}
                    forceReRender={[amount, currency]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customerName: shipping.name.full_name,
                                customerId: user.details._id,
                                products: cart.products.map((item) => {
                                    return {
                                        productId: item._id,
                                        postedBy: item.postedby,
                                        quantity: item.quantity,
                                    };
                                }),
                                address: shipping.address.address_line_1,
                                amount: cart.total,
                                method: 1,
                            });
                        });
                    }}
                />
            </>
        );
    };

    return (
        <div>
            <div className="right">
                <div className="wrapper">
                    <h2 className="title">CART TOTAL</h2>
                    <div className="totalText">
                        <b className="totalTextTitle">Subtotal:</b>₹ {cart.total}
                    </div>
                    <div className="totalText">
                        <b className="totalTextTitle">Discount:</b>₹ 0.00
                    </div>
                    <div className="totalText">
                        <b className="totalTextTitle">Total:</b>₹ {cart.total}
                    </div>
                    {open ? (
                        <div className="paymentMethods">
                            <button
                                className="payButton"
                                onClick={() => setCash(true)}
                            >
                                CASH ON DELIVERY
                            </button>
                            <PayPalScriptProvider
                                options={{
                                    "client-id":
                                        "ARO3D3zCsbgeI2urwYR-1mxCgcRv4x3fHvHxNT4EUPcUzx-Qa982KwwM9BareElDWaM2p-1iJXHVfRVX",
                                    components: "buttons",
                                    currency: "USD",
                                    "disable-funding": "credit,card,p24",
                                }}
                            >
                                <ButtonWrapper currency={currency} showSpinner={false} />
                            </PayPalScriptProvider>
                        </div>
                    ) : (
                        <button onClick={() => setOpen(true)} className="button">
                            CHECKOUT NOW!
                        </button>
                    )}
                </div>
            </div>
            {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
        </div>
    )
}

export default SummaryItem
