import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between items-center">
      <Link to="/dashboard" className="text-blue-400 font-bold text-xl">
        Workflow
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span>{user.username} ({user.role})</span>
            <button onClick={handleLogout} className="text-red-400 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
