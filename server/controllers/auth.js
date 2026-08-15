import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { isValidEmail, isValidPhone, minLength, requireFields } from "../utils/validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const formatUser = (userDoc) => {
    const { password, ...safeUser } = userDoc._doc || userDoc;
    const nurseryId = safeUser.nurseryId || safeUser.nursuries || null;
    return { ...safeUser, nurseryId, nursuries: nurseryId };
};

export const register = async (req, res, next) => {
    const validationError = requireFields(req.body, ["username", "email", "city", "country", "phone", "password"]);
    if (validationError) return next(validationError);

    if (!minLength(req.body.username, 3)) return next(createError(400, "Username must be at least 3 characters."));
    if (!isValidEmail(req.body.email)) return next(createError(400, "Enter a valid email address."));
    if (!isValidPhone(req.body.phone)) return next(createError(400, "Phone number must be 10 digits."));
    if (!minLength(req.body.password, 6)) return next(createError(400, "Password must be at least 6 characters."));

    try {
        const existingUser = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }],
        });

        if (existingUser) {
            return next(createError(409, "Username or email already exists."));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        const savedUser = await newUser.save();
        res.status(201).json(formatUser(savedUser));
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const validationError = requireFields(req.body, ["username", "password"]);
    if (validationError) return next(validationError);

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(401, "No account found with this username."));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) return next(createError(401, "Password is incorrect."));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT,
            { expiresIn: "7d" }
        );

        const { isAdmin, ...details } = formatUser(user);
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        }).status(200).json({ details, isAdmin });
    } catch (err) {
        next(err);
    }
};

