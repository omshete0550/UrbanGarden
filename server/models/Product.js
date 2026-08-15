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
        description: {
            type: String,
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
        nurseryId: {
            type: String,
            required: true,
        },
        postedby: {
            type: String,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        reviews: [
            {
                reviewBy: String,
                reviewby: String,
                rated: Number,
                review: String,
            },
        ],
    },
    { timestamps: true }
);

ProductSchema.pre("validate", function syncOldFieldNames(next) {
    if (this.description && !this.desc) this.desc = this.description;
    if (this.desc && !this.description) this.description = this.desc;
    if (this.nurseryId && !this.postedby) this.postedby = this.nurseryId;
    if (this.postedby && !this.nurseryId) this.nurseryId = this.postedby;

    this.reviews?.forEach((review) => {
        if (review.reviewBy && !review.reviewby) review.reviewby = review.reviewBy;
        if (review.reviewby && !review.reviewBy) review.reviewBy = review.reviewby;
    });

    next();
});

export default mongoose.model("Product", ProductSchema);
