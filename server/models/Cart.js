import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
            },
            price: { type: Number },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
},
    { timestamps: true }
);

export default mongoose.model("Cart", CartSchema)