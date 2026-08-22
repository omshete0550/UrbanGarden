import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;

    const cookieToken = req.cookies?.access_token;

    const token = cookieToken || bearerToken;

    if (!token) {
        return next(createError(401, "You are not authenticated."));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid."));
        }

        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err);
        }

        const requestedUserId = req.params.id || req.params.userId;

        if (!requestedUserId) {
            return next(createError(400, "User ID is required."));
        }

        if (!req.user) {
            return next(createError(401, "You are not authenticated."));
        }

        if (
            req.user.id === requestedUserId ||
            req.user.isAdmin
        ) {
            return next();
        }

        return next(createError(403, "You are not authorized."));
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err);
        }

        if (!req.user) {
            return next(createError(401, "You are not authenticated."));
        }

        if (req.user.isAdmin) {
            return next();
        }

        return next(createError(403, "Admin access is required."));
    });
};