import Nursery from "../models/Nursery.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { minLength, requireFields, validateObjectId, validatePositiveNumber } from "../utils/validation.js";

const normalizeNurseryPayload = (body) => {
    const description = body.description || body.desc;
    return {
        ...body,
        description,
        desc: description,
        photos: Array.isArray(body.photos) ? body.photos : [body.photos].filter(Boolean),
    };
};

export const createNursery = async (req, res, next) => {
    const ownerId = req.params.ownerId;
    const idError = validateObjectId(ownerId, "owner id");
    if (idError) return next(idError);

    const requestBody = normalizeNurseryPayload(req.body);
    const validationError = requireFields(requestBody, ["name", "city", "address", "description", "leastPrice"]);
    if (validationError) return next(validationError);

    if (!minLength(requestBody.name, 3)) return next(createError(400, "Nursery name must be at least 3 characters."));
    if (!minLength(requestBody.description, 15)) return next(createError(400, "Nursery description must be at least 15 characters."));
    if (!minLength(requestBody.address, 8)) return next(createError(400, "Nursery address must be at least 8 characters."));
    const priceError = validatePositiveNumber(requestBody.leastPrice, "Starting price");
    if (priceError) return next(priceError);

    try {
        const owner = await User.findById(ownerId);
        if (!owner) return next(createError(404, "Nursery owner not found."));

        const newNursery = new Nursery({
            ...requestBody,
            owner: ownerId,
        });

        const savedNursery = await newNursery.save();
        owner.nurseryId = savedNursery._id.toString();
        owner.nursuries = savedNursery._id.toString();
        await owner.save();

        res.status(201).json(savedNursery);
    } catch (error) {
        next(error);
    }
};

export const updateNursery = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "nursery id");
    if (idError) return next(idError);

    try {
        const updatedNursery = await Nursery.findByIdAndUpdate(
            req.params.id,
            { $set: normalizeNurseryPayload(req.body) },
            { new: true, runValidators: true }
        );
        if (!updatedNursery) return next(createError(404, "Nursery not found."));
        res.status(200).json(updatedNursery);
    } catch (err) {
        next(err);
    }
};

export const deleteNursery = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "nursery id");
    if (idError) return next(idError);

    try {
        const deletedNursery = await Nursery.findByIdAndDelete(req.params.id);
        if (!deletedNursery) return next(createError(404, "Nursery not found."));
        res.status(200).json({ message: "Nursery has been deleted." });
    } catch (err) {
        next(err);
    }
};

export const getNursery = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "nursery id");
    if (idError) return next(idError);

    try {
        const nursery = await Nursery.findById(req.params.id);
        if (!nursery) return next(createError(404, "Nursery not found."));
        res.status(200).json(nursery);
    } catch (err) {
        next(err);
    }
};

export const getNurseries = async (req, res, next) => {
    const { min, max, ...filters } = req.query;
    try {
        const nurseries = await Nursery.find({
            ...filters,
            leastPrice: { $gt: Number(min) || 1, $lt: Number(max) || 999999 },
        }).limit(Number(req.query.limit) || 0);
        res.status(200).json(nurseries);
    } catch (err) {
        next(err);
    }
};

export const countByCity = async (req, res, next) => {
    if (!req.query.cities) return next(createError(400, "cities query is required."));

    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Nursery.countDocuments({ city });
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const getNurseryProducts = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "nursery id");
    if (idError) return next(idError);

    try {
        const nursery = await Nursery.findById(req.params.id);
        if (!nursery) return next(createError(404, "Nursery not found."));

        const list = await Promise.all(
            nursery.products.map(product => {
                return Product.findById(product);
            })
        );
        res.status(200).json(list.filter(Boolean));
    } catch (err) {
        next(err);
    }
};

export const getNurserys = getNurseries;

