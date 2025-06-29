import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

//authenticaton routes like register and login it is entry point
router.post("/register", registerUser);  //done testing
router.post("/login", loginUser);

export default router;
