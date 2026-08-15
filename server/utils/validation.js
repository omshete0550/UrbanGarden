import mongoose from "mongoose";
import { createError } from "./error.js";

const fieldLabels = {
    username: "Username",
    email: "Email",
    city: "City",
    country: "Country",
    phone: "Phone number",
    password: "Password",
    name: "Name",
    description: "Description",
    price: "Price",
    season: "Season",
    category: "Category",
    nurseryId: "Nursery",
    userId: "User",
    customerName: "Customer name",
    customerId: "Customer",
    products: "Products",
    amount: "Amount",
    address: "Address",
    method: "Payment method",
    leastPrice: "Starting price",
};

export const getFieldLabel = (field) => fieldLabels[field] || field;

export const requireFields = (body, fields) => {
    const missingFields = fields.filter((field) => {
        const value = body[field];
        if (Array.isArray(value)) return value.length === 0;
        return value === undefined || value === null || String(value).trim() === "";
    });

    if (missingFields.length) {
        const labels = missingFields.map(getFieldLabel).join(", ");
        const fieldWord = missingFields.length === 1 ? "field is" : "fields are";
        return createError(400, `${labels} ${fieldWord} required.`);
    }

    return null;
};

export const validateObjectId = (id, name = "id") => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return createError(400, `Invalid ${name}. Please refresh and try again.`);
    }

    return null;
};

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

export const isValidPhone = (phone) => /^[0-9]{10}$/.test(String(phone).trim());

export const minLength = (value, length) => String(value || "").trim().length >= length;

export const validatePositiveNumber = (value, label) => {
    const numberValue = Number(value);
    if (!Number.isFinite(numberValue) || numberValue <= 0) {
        return createError(400, `${label} must be greater than 0.`);
    }
    return null;
};
