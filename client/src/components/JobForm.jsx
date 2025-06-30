import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
//It is  a form to create user
const JobForm = () => {
  const { token, user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
  });
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); //Added navigate

  if (!["ADMIN", "MANAGER"].includes(user?.role)) return null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users");
      }
    };
    fetchUsers();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await axios.post("http://localhost:8080/api/jobs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("Job created successfully!");

      // Clear form
      setForm({ title: "", description: "", assigned_to: "" });

     
      navigate("/dashboard");
    } catch (err) {
      setMsg(" Error creating job");
    }
  };

  return (
    <div className="bg-white rounded shadow w-screen h-screen overflow-hidden">
      <div className="p-30">
        <h3 className="text-3xl font-bold mb-4">Create Job</h3>

      {msg && <p className="text-sm mb-4 text-blue-600">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="assigned_to"
          value={form.assigned_to}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Assign to User --</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.username} ({u.role})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>


      </div>
          </div>
  );
};

export default JobForm;
