import mongoose from "mongoose";

const NurserySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    description: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    products: {
        type: [String],
    },
    leastPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
});

NurserySchema.pre("validate", function syncDescriptionName(next) {
    if (this.description && !this.desc) this.desc = this.description;
    if (this.desc && !this.description) this.description = this.desc;
    next();
});

export default mongoose.model("Nursery", NurserySchema);
