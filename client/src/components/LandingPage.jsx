import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-24 py-4 bg-gray-950 shadow-md border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Maplano</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white font-medium">
            Login
          </Link>
          <Link
            to="/register"
           className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-4 py-2 rounded hover:from-blue-700 hover:to-blue-500 transition"

          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-6xl font-thin mb-4 text-white">
          Plan, Assign, Track – All in One Place
        </h2>
        <p className="text-lg text-gray-300 mb-6 font-semibold mt-10">
          Maplano helps teams stay organized with a streamlined job assignment and progress tracking system.
        </p>
        <Link
          to="/dashboard"
          className=" inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-4 py-2 rounded hover:from-blue-700 hover:to-blue-500 transition"

        >
          Try Demo
        </Link>
      </header>

     
      

      {/* Footer */}
      <footer className="text-center  border-t border-gray-700 pt-5 mt-20">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Maplano. Built with 💙 by shraddha.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
