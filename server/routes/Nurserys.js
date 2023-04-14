import express from "express";
const router = express.Router()
import { countByCity, createNursery, deleteNursery, getNursery, getNurseryProducts, getNurserys, updateNursery } from "../controllers/Nursery.js";
import { verifyAdmin } from "../utils/verifyToken.js";

//create
router.post("/:ownerId", verifyAdmin, createNursery)

//update
router.put("/:id", verifyAdmin, updateNursery)

//delete
router.delete("/:id", verifyAdmin, deleteNursery)

//get
router.get("/:id", getNursery)

//get nurserys all products
router.get("/:id/products", getNurseryProducts)

//get all
router.get("/", getNurserys)
router.get("/countByCity", countByCity)

export default router