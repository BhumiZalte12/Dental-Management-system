import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/LandingPage" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact</Link>

          {user?.role === "Admin" && (
            <>
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/admin/patients" className="nav-link">Patients</Link>
              <Link to="/admin/incidents" className="nav-link">Incidents</Link>
              <Link to="/admin/calendar" className="nav-link">Calendar</Link>
            </>
          )}

          {user?.role === "Patient" && (
            <Link to="/me" className="nav-link">My Profile</Link>
          )}

          {!user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center gap-1 transition"
              >
                Login <ChevronDownIcon className="w-4 h-4" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade">
                  <div className="p-2 space-y-2">
                    <Link
                      to="/login/admin"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-sky-100 hover:text-sky-700 rounded-md transition"
                    >
                      🔐 Login as Admin
                    </Link>
                    <Link
                      to="/login/patient"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-sky-100 hover:text-sky-700 rounded-md transition"
                    >
                      🧑‍⚕️ Login as Patient
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6 text-sky-700" />
            ) : (
              <MenuIcon className="w-6 h-6 text-sky-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
          <Link to="/LandingPage" className="block nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/contact" className="block nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

          {user?.role === "Admin" && (
            <>
              <Link to="/admin/dashboard" className="block nav-link">Dashboard</Link>
              <Link to="/admin/patients" className="block nav-link">Patients</Link>
              <Link to="/admin/incidents" className="block nav-link">Incidents</Link>
              <Link to="/admin/calendar" className="block nav-link">Calendar</Link>
            </>
          )}

          {user?.role === "Patient" && (
            <Link to="/me" className="block nav-link">My Profile</Link>
          )}

          {!user ? (
            <>
              <Link to="/login/admin" className="block bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition">
                🔐 Login as Admin
              </Link>
              <Link to="/login/patient" className="block bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition">
                🧑‍⚕️ Login as Patient
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
