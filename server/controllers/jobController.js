import Job from "../models/Job.js";
import Comment from "../models/Comment.js";

//  Create new job
export const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      created_by: req.user.id,
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all jobs with optional filters
export const getAllJobs = async (req, res) => {
  try {
    const { assigned_to, status } = req.query;
    const filter = {};
    if (assigned_to) filter.assigned_to = assigned_to;
    if (status) filter.status = status;

    const jobs = await Job.find(filter)
      .populate("assigned_to", "username role")
      .populate("created_by", "username role");

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get job details with comments
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("assigned_to", "username role")
      .populate("created_by", "username role");

    if (!job) return res.status(404).json({ msg: "Job not found" });

    const comments = await Comment.find({ job: job._id }).populate("created_by", "username");

    res.json({ job, comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign job to a user
export const assignJob = async (req, res) => {
  try {
    const { userId } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { assigned_to: userId },
      { new: true }
    ).populate("assigned_to", "username");

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json({ msg: "Job assigned successfully", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update job status
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job status updated", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Admin/Manager only
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    await job.deleteOne();
    res.json({ msg: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



