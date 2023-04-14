import Nursery from "../models/Nursery.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createNursery = async (req, res, next) => {
    const ownerId = req.params.ownerId
    const newNursery = new Nursery(req.body);
    try {
        const savedNursery = await newNursery.save()
        try {
            const owner = await User.findById(ownerId)
            owner.nursuries = savedNursery._id;
            owner.save()
        } catch (error) {
            next(error)
        }
        res.status(201).json(savedNursery)
    } catch (error) {
        next(error)
    }
};
export const updateNursery = async (req, res, next) => {
    try {
        const updatedNursery = await Nursery.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedNursery);
    } catch (err) {
        next(err);
    }
};
export const deleteNursery = async (req, res, next) => {
    try {
        await Nursery.findByIdAndDelete(req.params.id);
        res.status(200).json("Nursery has been deleted.");
    } catch (err) {
        next(err);
    }
};
export const getNursery = async (req, res, next) => {
    try {
        const nursery = await Nursery.findById(req.params.id);
        res.status(200).json(nursery);
    } catch (err) {
        next(err);
    }
};
export const getNurserys = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const allNurserys = await Nursery.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit)
        res.status(200).json(allNurserys)
    } catch (err) {
        next(err);
    }
};
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Nursery.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};
export const getNurseryProducts = async (req, res, next) => {
    try {
        const nursery = await Nursery.findById(req.params.id)
        const list = await Promise.all(
            nursery.products.map(product => {
                return Product.findById(product)
            }))
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};