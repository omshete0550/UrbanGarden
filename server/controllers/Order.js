import Order from "../models/Order.js";
import { createError } from "../utils/error.js";
import { isValidPhone, minLength, requireFields, validateObjectId, validatePositiveNumber } from "../utils/validation.js";

export const createOrder = async (req, res, next) => {
    const validationError = requireFields(req.body, [
        "customerName",
        "customerId",
        "products",
        "amount",
        "address",
        "method",
    ]);
    if (validationError) return next(validationError);

    if (!Array.isArray(req.body.products) || req.body.products.length === 0) {
        return next(createError(400, "Your cart is empty. Add a product before placing an order."));
    }
    if (!minLength(req.body.customerName, 2)) return next(createError(400, "Customer name must be at least 2 characters."));
    if (req.body.phone && !isValidPhone(req.body.phone)) return next(createError(400, "Phone number must be 10 digits."));
    if (!minLength(req.body.address, 8)) return next(createError(400, "Delivery address must be at least 8 characters."));
    const amountError = validatePositiveNumber(req.body.amount, "Order amount");
    if (amountError) return next(amountError);

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        next(err);
    }
};

export const updateOrder = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "order id");
    if (idError) return next(idError);

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) return next(createError(404, "Order not found."));

        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

export const deleteOrder = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "order id");
    if (idError) return next(idError);

    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return next(createError(404, "Order not found."));

        res.status(200).json({ message: "Order has been deleted." });
    } catch (err) {
        next(err);
    }
};

export const getUserAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({ customerId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

