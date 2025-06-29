import express from "express";
import { addComment } from "../controllers/commentController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a comment to a job
router.post("/jobs/:jobId/comments", authenticate, addComment);

export default router;
