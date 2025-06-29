import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  assignJob,
  updateJobStatus,
  deleteJob
} from "../controllers/jobController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//All routes related to the job/tasks
router.post("/", authenticate, createJob);
router.get("/", authenticate, getAllJobs);
router.get("/:id", authenticate, getJobById);
router.put("/:id/assign", authenticate, assignJob);
router.put("/:id/status", authenticate, updateJobStatus);
router.delete("/:id", authenticate, authorizeRoles("ADMIN", "MANAGER"), deleteJob);

export default router;
