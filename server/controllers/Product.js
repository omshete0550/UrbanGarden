import Product from "../models/Product.js";
import Nursery from "../models/Nursery.js";
import { createError } from "../utils/error.js";
import { minLength, requireFields, validateObjectId, validatePositiveNumber } from "../utils/validation.js";

const normalizeProductPayload = (body, nurseryId) => {
    const description = body.description || body.desc;
    const linkedNurseryId = nurseryId || body.nurseryId || body.postedby;

    return {
        ...body,
        description,
        desc: description,
        nurseryId: linkedNurseryId,
        postedby: linkedNurseryId,
        price: body.price === undefined ? body.price : Number(body.price),
        photos: Array.isArray(body.photos) ? body.photos : [body.photos].filter(Boolean),
    };
};

export const createProduct = async (req, res, next) => {
    const nurseryId = req.params.nurseryId;
    const idError = validateObjectId(nurseryId, "nursery id");
    if (idError) return next(idError);

    const requestBody = normalizeProductPayload(req.body, nurseryId);
    const validationError = requireFields(requestBody, ["name", "price", "season", "category", "nurseryId"]);
    if (validationError) return next(validationError);

    if (!minLength(requestBody.name, 2)) return next(createError(400, "Product name must be at least 2 characters."));
    if (requestBody.description && !minLength(requestBody.description, 10)) return next(createError(400, "Product description must be at least 10 characters."));
    const priceError = validatePositiveNumber(requestBody.price, "Product price");
    if (priceError) return next(priceError);

    try {
        const nursery = await Nursery.findById(nurseryId);
        if (!nursery) return next(createError(404, "Nursery not found."));

        const newProduct = new Product(requestBody);

        const savedProduct = await newProduct.save();
        nursery.products.push(savedProduct._id);
        await nursery.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "product id");
    if (idError) return next(idError);

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: normalizeProductPayload(req.body) },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return next(createError(404, "Product not found."));
        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    const nurseryId = req.params.nurseryId;
    const productId = req.params.id;
    const nurseryIdError = validateObjectId(nurseryId, "nursery id");
    if (nurseryIdError) return next(nurseryIdError);
    const productIdError = validateObjectId(productId, "product id");
    if (productIdError) return next(productIdError);

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) return next(createError(404, "Product not found."));

        await Nursery.findByIdAndUpdate(nurseryId, {
            $pull: { products: productId },
        });

        res.status(200).json({ message: "Product has been deleted." });
    } catch (err) {
        next(err);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        if (req.params.username) {
            const products = await Product.find({ name: req.params.username });
            return res.status(200).json(products);
        }

        const idError = validateObjectId(req.params.id, "product id");
        if (idError) return next(idError);

        const product = await Product.findById(req.params.id);
        if (!product) return next(createError(404, "Product not found."));
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

export const getProducts = async (req, res, next) => {
    const { min, max, ...filters } = req.query;
    try {
        const products = await Product.find({
            ...filters,
            price: { $gt: Number(min) || 1, $lt: Number(max) || 999999 },
        }).limit(Number(req.query.limit) || 0);
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

export const getProductsByCity = async (req, res, next) => {
    const userCity = req.params.city;
    try {
        const nurseries = await Nursery.find({ city: userCity });
        const productList = await Promise.all(
            nurseries.map(async (nursery) => {
                const products = await Product.find({ _id: { $in: nursery.products } }).limit(3);
                return products;
            })
        );
        res.status(200).json(productList.flat());
    } catch (err) {
        next(err);
    }
};

export const randomDisplay = async (req, res, next) => {
    if (!req.query.category) return next(createError(400, "category query is required."));

    try {
        const products = await Product.find({ category: req.query.category });
        res.status(200).json(products.sort(() => Math.random() - 0.5));
    } catch (err) {
        next(err);
    }
};

export const trendingProducts = async (req, res, next) => {
    try {
        const trendingProducts = await Product.aggregate([
            {
                $group: {
                    _id: {
                        id: "$_id",
                        name: "$name",
                        description: "$description",
                        desc: "$desc",
                        price: "$price",
                        photos: "$photos",
                    },
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
        ]);
        res.status(200).json(trendingProducts);
    } catch (err) {
        next(err);
    }
};

