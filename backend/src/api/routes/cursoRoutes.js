import { Router } from "express";
import { createCurso, getCursos, getCursoById, updateCurso, deleteCurso } from "../controllers/cursoController.js";
const router = Router();
router.post("/createCurso", createCurso);
router.get("/getCursos", getCursos);
router.get("/getCurso/:id", getCursoById);
router.delete("/deleteCurso/:id", deleteCurso);
router.put("/:id", updateCurso);
export default router;