import Cart from "../models/Cart.js";
import { createError } from "../utils/error.js";
import { requireFields, validateObjectId } from "../utils/validation.js";

export const createCart = async (req, res, next) => {
    const validationError = requireFields(req.body, ["userId"]);
    if (validationError) return next(validationError);

    if (!req.user.isAdmin && req.user.id !== req.body.userId) {
        return next(createError(403, "You are not authorized to create this cart."));
    }

    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        next(err);
    }
};

export const updateCart = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "cart id");
    if (idError) return next(idError);

    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) return next(createError(404, "Cart not found."));

        if (!req.user.isAdmin && req.user.id !== cart.userId) {
            return next(createError(403, "You are not authorized to update this cart."));
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
    }
};

export const deleteCart = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "cart id");
    if (idError) return next(idError);

    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) return next(createError(404, "Cart not found."));

        if (!req.user.isAdmin && req.user.id !== cart.userId) {
            return next(createError(403, "You are not authorized to delete this cart."));
        }

        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Cart has been deleted." });
    } catch (err) {
        next(err);
    }
};

export const getUserCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};

export const getAllUserCart = async (req, res, next) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        next(err);
    }
};
