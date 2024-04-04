import {Router} from "express";
import {createApoderado, getApoderados, getApoderadoById, updateApoderado, deleteApoderado} from "../controllers/apoderadoController.js";   
const router = Router();
router.post("/createApoderado", createApoderado);
router.get("/getApoderados", getApoderados);
router.get("/getApoderado/:id", getApoderadoById);
router.delete("/deleteApoderado/:id", deleteApoderado);
router.put("/:id", updateApoderado);
export default router;