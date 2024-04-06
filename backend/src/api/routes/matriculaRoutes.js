import Router from "express";
import {createMatricula, getMatriculas, getMatriculaById, updateMatricula, deleteMatricula} from "../controllers/matriculaController.js";
const router = Router();
router.post("/createMatricula", createMatricula);
router.get("/getMatriculas", getMatriculas);
router.get("/getMatricula/:id", getMatriculaById);
router.delete("/deleteMatricula/:id", deleteMatricula);
router.put("/:id", updateMatricula);
export default router;