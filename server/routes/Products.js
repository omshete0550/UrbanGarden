import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    getProductsByCity,
    randomDisplay,
    trendingProducts,
    updateProduct,
} from "../controllers/Product.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/trending", trendingProducts);
router.get("/categories", randomDisplay);
router.get("/username/:username", getProduct);
router.get("/city/:city", getProductsByCity);
router.post("/:nurseryId", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id/:nurseryId", verifyAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

export default router;
