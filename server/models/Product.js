import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        photos: {
            type: [String],
        },
        desc: {
            type: String,
        },
        season: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        postedby: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        reviews: [{
            reviewby: String,
            rated: Number,
            review: String
        }],
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);