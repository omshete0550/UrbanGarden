import express from "express";
const router = express.Router()
import { createOrder, updateOrder, deleteOrder, getUserAllOrder, getAll } from "../controllers/Order.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyUser, getUserAllOrder);

//GET ALL
router.get("/", verifyAdmin, getAll);

export default router