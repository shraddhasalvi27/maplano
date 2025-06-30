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

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`http://localhost:8080/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.job)
      setJob(res.data.job);
      setAssignedTo(res.data.assigned_to?._id || "");
      setStatus(res.data.status);
    };

    fetchJob();
  }, [id, token]);

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
      await axios.put(
        `http://localhost:8080/api/jobs/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Status updated!");
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (!job) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10 mt-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-white">{job.title}</h2>
        <p className="text-gray-300 mb-4">Description: {job.description}</p>
        <p className="text-sm text-gray-400 mb-6">
          Assigned to: {job.assigned_to?.username || "Unassigned"}
        </p>

        {isPrivileged ? (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Update Status:
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="p-2 w-full bg-gray-800 text-white border border-gray-600 rounded"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        ) : (
          <p>Status: {job.status}</p>
        )}

        {isPrivileged && (
          <form onSubmit={handleReassign} className="mb-6 space-y-3">
            <label className="block text-sm font-medium mb-1">
              Reassign Job:
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="p-2 w-full bg-gray-800 text-white border border-gray-600 rounded"
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
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold px-4 py-2 rounded"
            >
              Reassign
            </button>
          </form>
        )}

        {/* Comments Section */}
        <div className="mt-10">
          <CommentSection jobId={id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
