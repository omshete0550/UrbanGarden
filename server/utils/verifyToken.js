import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;
    const token = req.cookies.access_token || bearerToken;

    if (!token) {
        return next(createError(401, "You are not authenticated."));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid."));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        const requestedUserId = req.params.id || req.params.userId;

        if (req.user.id === requestedUserId || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized."));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Admin access is required."));
        }
    });
};
