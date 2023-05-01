import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, getProductsByCity, randomDisplay, trendingProducts, updateProduct } from "../controllers/Product.js";
const router = express.Router()
import { verifyAdmin } from "../utils/verifyToken.js";

//create
router.get("/trending", trendingProducts)
router.post("/:nurseryId", verifyAdmin, createProduct)
router.get("/categories", randomDisplay)
//update
router.put("/:id", verifyAdmin, updateProduct)

//delete
router.delete("/:id/:nurseryId", verifyAdmin, deleteProduct)

//get
router.get('/:id', getProduct);
router.get('/username/:username', getProduct);


//get all
router.get("/", getProducts)
router.get("/city/:city", getProductsByCity)

export default router