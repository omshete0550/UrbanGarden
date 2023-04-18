import Order from "../models/Order.js";

//CREATE
export const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        next(err)
    }
};

//UPDATE
export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err)
    }
};

//DELETE
export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        next(err)
    }
};

//GET USER ORDERS
export const getUserAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({ customerId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        next(err)
    }
};

//GET ALL
export const getAll = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next(err)
    }
};
