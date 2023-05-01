import Product from "../models/Product.js"
import Nursery from "../models/Nursery.js"

export const createProduct = async (req, res, next) => {
    const NurseryId = req.params.nurseryId
    const newProduct = new Product(req.body)
    newProduct.postedby = NurseryId
    try {
        const savedProduct = await newProduct.save()
        try {
            await Nursery.findByIdAndUpdate(NurseryId, {
                $push: { products: savedProduct._id }
            })
        } catch (error) {
            next(error)
        }
        res.status(201).json(savedProduct)
    } catch (error) {
        next(error)
    }
}
export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};
export const deleteProduct = async (req, res, next) => {
    const NurseryId = req.params.NurseryId
    const ProductId = req.params.id
    try {
        await Product.findByIdAndDelete(ProductId);
        try {
            await Nursery.findByIdAndUpdate(NurseryId, {
                $pull: { Products: ProductId }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        next(err);
    }
};
export const getProduct = async (req, res, next) => {
    try {
        let product;
        if (req.params.username) {
            product = await Product.find({ name: req.params.username });
        } else if (req.params.id) {
            product = await Product.findById(req.params.id);
        }
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        next(err);
    }
};

export const getProducts = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const allProducts = await Product.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit)
        res.status(200).json(allProducts)
    } catch (err) {
        next(err);
    }
};

export const randomDisplay = async (req, res, next) => {
    const category = req.query.category;
    try {
        const products = await Product.find({ category: category });
        const indices = new Set();
        while (indices.size < products.length) {
            const index = Math.floor(Math.random() * (products.length));
            indices.add(index);
        }
        const selectedProducts = Array.from(indices).map(index => products[index]);
        res.status(200).json(selectedProducts);
    } catch (err) {
        next(err);
    }
};

export const trendingProducts = async (req, res, next) => {
    try {
        Product.aggregate([
            {
                $group: {
                    _id: { id: "$_id", name: "$name", desc: "$desc", price: "$price", photos: "$photos" },
                    totalRating: { $sum: "$rating" },
                    count: { $sum: 1 },
                    latestPostDate: { $max: "$createdAt" },
                },
            },
            {
                $addFields: {
                    avgRating: { $divide: ["$totalRating", "$count"] },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
            { $limit: 10 },
        ]).then((trendingProducts) => {
            res.status(200).json(trendingProducts)
        })
    } catch (err) {
        next(err);
    }
};