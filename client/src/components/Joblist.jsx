import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Joblist = () => {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };
    fetchJobs();
  }, [token]);

  const isManagerOrAdmin = user?.role === "ADMIN" || user?.role === "MANAGER";

  return (
    <div className="p-6 w-screen">
      <h2 className="text-xl mb-4">Job Dashboard</h2>

      {/* Filter Dropdown */}
      <select
        className="mb-4 border px-3 py-1"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

      {/* Role-based Create Buttons */}
      {isManagerOrAdmin && (
        <div className="mb-4 flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/create-job")}
          >
            Create Job
          </button>
        </div>
      )}

      {/* Jobs List */}
      {jobs
        .filter((job) => !filter || job.status === filter)
        .map((job) => (
          <Link key={job._id} to={`/job/${job._id}`}>
            <div className="bg-white p-4 rounded shadow mb-3">
              <h3 className="font-semibold">{job.title}</h3>
              <p>Status: {job.status}</p>
              <p>Assigned To: {job.assigned_to?.username || "Unassigned"}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Joblist;
