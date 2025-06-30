import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Joblist = () => {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const isManagerOrAdmin = user?.role === "ADMIN" || user?.role === "MANAGER";

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

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:8080/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchJobs(); // Refresh list
      } catch (err) {
        console.error("Failed to delete job:", err);
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-20 pt-20">
      <div className="flex justify-between items-center">
        {isManagerOrAdmin && (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded font-medium"
            onClick={() => navigate("/create-job")}
          >
            + Create Job
          </button>
        )}

        <select
          className="border px-3 py-1 bg-white rounded text-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="h-[70vh] overflow-y-auto p-4 scrollbar-hide mt-5">
        {jobs
          .filter((job) => !filter || job.status === filter)
          .map((job) => (
            <div
              key={job._id}
              className="bg-black text-white border border-black  outline-1 outline-gray-600 p-4 rounded-lg shadow mb-4 flex justify-between items-start"
            >
              <Link to={`/job/${job._id}`} className="flex-1">
                <div className="flex space-x-4">
                  <h3 className="text-lg font-bold text-white">{job.title} </h3>
                  <div
                    className={`shrink-0  px-3 py-2  rounded-full text-[0.60rem] font-bold ${getStatusStyle(
                      job.status
                    )}`}
                  >
                    {job.status.replace("_", " ")}
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  
                  <span className="font-medium text-white">
                    {job.assigned_to?.username || "Unassigned"}
                  </span>
                </p>
              </Link>

              {isManagerOrAdmin && (
                <button
                  onClick={() => handleDelete(job._id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  title="Delete Job"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Joblist;
