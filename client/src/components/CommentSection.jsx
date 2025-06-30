import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

const CommentSection = ({ jobId }) => {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:8080/api/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(res.data.comments || []);
  };

  const submitComment = async () => {
    await axios.post(
      `http://localhost:8080/api/jobs/${jobId}/comments`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold">Comments</h3>
      <textarea
        className="w-full border rounded p-2 mt-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your comment"
      ></textarea>
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
        onClick={submitComment}
      >
        Add Comment
      </button>

      <ul className="mt-4 space-y-2">
        {comments.map((c) => (
          <li key={c._id} className="bg-gray-100 text-black p-2 rounded">
            {c.text} — <i>{c.created_by?.username}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CommentSection;
