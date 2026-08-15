import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/Users.js"
import nurseriesRoute from "./routes/Nurseries.js"
import productsRoute from "./routes/Products.js"
import cartsRoute from "./routes/Carts.js"
import ordersRoute from "./routes/Orders.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const Port = process.env.PORT || 8800;
const requiredEnvVars = ["MONGO_URL", "JWT"];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`${envVar} is missing. Add it to server/.env before starting the API.`);
    }
});

//database connection
mongoose.set('strictQuery', true);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected")
    } catch (err) {
        throw err
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected")
})

//middlewares
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/nurseries", nurseriesRoute)
app.use("/api/nurserys", nurseriesRoute)
app.use("/api/products", productsRoute)
app.use("/api/cart", cartsRoute)
app.use("/api/orders", ordersRoute)

app.use((err, req, res, next) => {
    let errorStatus = err.status || 500;
    let errorMessage = err.message || "Something went wrong!";

    if (err.name === "ValidationError") {
        errorStatus = 400;
        errorMessage = Object.values(err.errors).map((item) => item.message).join(", ");
    }

    if (err.name === "CastError") {
        errorStatus = 400;
        errorMessage = "Invalid id format.";
    }

    if (err.code === 11000) {
        errorStatus = 409;
        errorMessage = `${Object.keys(err.keyValue).join(", ")} already exists.`;
    }

    if (process.env.NODE_ENV !== "production") {
        console.error(errorMessage);
    }

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
});

app.listen(Port, () => {
    connect()
    console.log("Server started on Port " + Port)
})



