import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
            },
            postedBy: {
                type: String,
            },
            quantity: {
                type: Number,
            },
        },
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: Number,
        default: 0,
    },
    method: {
        type: Number,
        require: true,
    },
},
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);