import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//User routes to get deatails like user list and individual user details 
router.get("/", authenticate, authorizeRoles("ADMIN", "MANAGER"), getAllUsers);
router.get("/:id", authenticate, getUserById);

export default router;
