import express from "express";
const router = express.Router()
import { countByCity, createNursery, deleteNursery, getNursery, getNurserys, updateNursery } from "../controllers/Nursery.js";
import { verifyAdmin } from "../utils/verifyToken.js";

//create
router.post("/", verifyAdmin, createNursery)

//update
router.put("/:id", verifyAdmin, updateNursery)

//delete
router.delete("/:id", verifyAdmin, deleteNursery)

//get
router.get("/find/:id", getNursery)

//get all
router.get("/", getNurserys)
router.get("/countByCity", countByCity)

export default router