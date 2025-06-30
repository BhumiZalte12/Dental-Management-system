import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-sky-700 tracking-wide">
          🦷 ENTNT Dental Care
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/LandingPage" className="text-gray-700 hover:text-sky-700 font-medium transition duration-200">Home</Link>
          <Link to="/contact" className="text-gray-700 hover:text-sky-700 font-medium transition duration-200">Contact</Link>

          {/* Admin Navigation */}
          {user?.role === "Admin" && (
            <>
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-sky-700 font-medium transition">Dashboard</Link>
              <Link to="/admin/patients" className="text-gray-700 hover:text-sky-700 font-medium transition">Patients</Link>
              <Link to="/admin/incidents" className="text-gray-700 hover:text-sky-700 font-medium transition">Incidents</Link>
              <Link to="/admin/calendar" className="text-gray-700 hover:text-sky-700 font-medium transition">Calendar</Link>
            </>
          )}

          {/* Patient Navigation */}
          {user?.role === "Patient" && (
            <Link to="/me" className="text-gray-700 hover:text-sky-700 font-medium transition">My Profile</Link>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-sky-600 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-sky-700 transition"
              >
                Login <ChevronDownIcon className="w-4 h-4" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50">
                  <Link
                    to="/login/admin"
                    className="block px-4 py-2 hover:bg-sky-100 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    Login as Admin
                  </Link>
                  <Link
                    to="/login/patient"
                    className="block px-4 py-2 hover:bg-sky-100 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    Login as Patient
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
