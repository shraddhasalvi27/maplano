import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Joblist from "./components/Joblist";
import JobDetail from "./components/JobDetails";
import JobForm from "./components/JobForm";
// import UserForm from "./components/UserForm";
import { useAuth } from "./context/authContext";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Optional Navbar */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={user ? <Joblist /> : <Navigate to="/login" />}
        />
        <Route
          path="/job/:id"
          element={user ? <JobDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-job"
          element={user ? <JobForm /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/create-user"
          element={user ? <UserForm /> : <Navigate to="/login" />}
        /> */}

        {/* Default Redirect */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
