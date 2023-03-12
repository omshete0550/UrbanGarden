import express from "express";
const router = express.Router()
import { createCart, updateCart, deleteCart, getUserCart, getAllUserCart } from "../controllers/Cart.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//CREATE
router.post("/", verifyToken, createCart)

//UPDATE
router.put("/:id", verifyUser, updateCart);

//DELETE
router.delete("/:id", verifyUser, deleteCart);

//GET USER CART
router.get("/find/:userId", verifyUser, getUserCart);

//GET ALL
router.get("/", verifyAdmin, getAllUserCart);

export default router