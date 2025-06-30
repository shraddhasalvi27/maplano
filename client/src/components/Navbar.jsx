import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-20 py-3 flex justify-between items-center fixed top-0 left-0 w-full">
      <Link to="/dashboard" className="text-blue-400 font-bold text-xl">
        MAPLANO
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-sm mr-10">{user.username} ({user.role})</span>
            <button onClick={handleLogout} className="text-gray-200 font-bold hover:underline">Logout</button>
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
