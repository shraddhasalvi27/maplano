import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import CommentSection from "./CommentSection";

const JobDetail = () => {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [job, setJob] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");

  const isPrivileged = ["ADMIN", "MANAGER"].includes(user?.role);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`http://localhost:8080/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJob(res.data);
      setAssignedTo(res.data.assigned_to?._id || "");
      setStatus(res.data.status);
    };

    fetchJob();
  }, [id, token]);

  // Fetch all users (for reassignment)
  useEffect(() => {
    if (isPrivileged) {
      axios
        .get("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data));
    }
  }, [user, token]);

  const handleReassign = async (e) => {
  e.preventDefault();
  try {
   await axios.put(
  `http://localhost:8080/api/jobs/${id}/assign`,
  { userId: assignedTo },
  { headers: { Authorization: `Bearer ${token}` } }
);

    alert("Job reassigned successfully!");

    // ✅ Re-fetch updated job
    const updated = await axios.get(`http://localhost:8080/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJob(updated.data);
  } catch (err) {
    alert("Failed to reassign job");
  }
};


  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      const res = await axios.put(
        `http://localhost:8080/api/jobs/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Status updated!");
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-6 w-screen">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="mb-2">Description: {job.description}</p>
      <p>Assigned to: {job.assigned_to?.username || "Unassigned"}</p>

      {/* Status Dropdown */}
      {isPrivileged ? (
        <div className="my-4">
          <label className="block text-sm font-medium">Update Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-2 border rounded w-full"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      ) : (
        <p>Status: {job.status}</p>
      )}

      {/* Reassign Form */}
      {isPrivileged && (
        <form onSubmit={handleReassign} className="mt-4 space-y-2">
          <label className="block text-sm font-medium">Reassign Job:</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">-- Select User --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.username} ({u.role})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Reassign
          </button>
        </form>
      )}

      <CommentSection jobId={id} />
    </div>
  );
};

export default JobDetail;
