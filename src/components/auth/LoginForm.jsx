import { useState } from "react";
import { useParams } from "react-router-dom";

export default function LoginForm({ onSubmit, error }) {
  const { role: routeRole } = useParams();
  const role =
    routeRole?.charAt(0).toUpperCase() + routeRole?.slice(1).toLowerCase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    onSubmit(email, password, role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-auto mt-10"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-700">
        {role === "Admin" ? "Admin Login" : "Patient Login"}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm border border-red-300">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition duration-200 font-semibold"
        >
          Login
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Logging in as <span className="font-medium text-sky-700">{role}</span>
      </p>
    </form>
  );
}
