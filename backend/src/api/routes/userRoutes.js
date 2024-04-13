import {Router} from "express";
import {createUser, getUsers, getUserById, updateUser, deleteUser} from "../controllers/userController.js";
const router = Router();
router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.delete("/deleteUser/:id", deleteUser);
router.put("/:id", updateUser);
export default router;
