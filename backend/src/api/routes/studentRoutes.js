import { Router } from "express";
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from "../controllers/studentController.js";
const router = Router();
router.post("/createStudent", createStudent);
router.get("/getStudents", getStudents);
router.get("/getStudent/:id", getStudentById);
router.delete("/deleteStudent/:id", deleteStudent);
router.put("/:id", updateStudent);
export default router;