import Comment from "../models/Comment.js";
import Job from "../models/Job.js";

// jobId-comments
export const addComment = async (req, res) => {
  const { text } = req.body;
  const { jobId } = req.params;

  if (!text) return res.status(400).json({ msg: "Comment text is required" });

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const comment = new Comment({
      text,
      created_by: req.user.id,
      job: jobId,
    });

    await comment.save();

    res.status(201).json({
      msg: "Comment added successfully",
      comment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
