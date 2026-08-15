import express from "express";
import {
    countByCity,
    createNursery,
    deleteNursery,
    getNursery,
    getNurseryProducts,
    getNurseries,
    updateNursery,
} from "../controllers/Nursery.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/countByCity", countByCity);
router.post("/:ownerId", verifyAdmin, createNursery);
router.put("/:id", verifyAdmin, updateNursery);
router.delete("/:id", verifyAdmin, deleteNursery);
router.get("/:id/products", getNurseryProducts);
router.get("/:id", getNursery);
router.get("/", getNurseries);

export default router;

