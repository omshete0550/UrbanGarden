import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { validateObjectId } from "../utils/validation.js";

const formatUser = (user) => {
    const userData = user._doc || user;

    const nurseryId =
        userData.nurseryId ||
        userData.nurseries ||
        userData.nursuries ||
        null;

    return {
        ...userData,
        nurseryId,
        nurseries: nurseryId,
        nursuries: nurseryId,
    };
};

export const updateUser = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "user id");
    if (idError) return next(idError);

    const nurseryId = req.body.nurseryId || req.body.nurseries || req.body.nursuries;

    const updatePayload = {
        ...req.body,
        ...(nurseryId
            ? {
                nurseryId,
                nurseries: nurseryId,
                nursuries: nurseryId,
            }
            : {}),
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updatePayload },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return next(createError(404, "User not found."));
        }

        res.status(200).json(formatUser(updatedUser));
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    const idError = validateObjectId(req.params.id, "user id");
    if (idError) return next(idError);

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return next(createError(404, "User not found."));
        }

        res.status(200).json({
            message: "User has been deleted.",
        });
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.params.username,
        }).select("-password");

        if (!user) {
            return next(createError(404, "User not found."));
        }

        res.status(200).json(formatUser(user));
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json(users.map(formatUser));
    } catch (err) {
        next(err);
    }
};