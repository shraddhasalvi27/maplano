import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import CommentSection from "./CommentSection";

const JobDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJob(res.data));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-6 w-screen">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="mb-2">Description: {job.description}</p>
      <p>Status: {job.status}</p>
      <p>Assigned to: {job.assigned_to?.username || "Unassigned"}</p>

      <CommentSection jobId={id} />
    </div>
  );
};
export default JobDetail;
