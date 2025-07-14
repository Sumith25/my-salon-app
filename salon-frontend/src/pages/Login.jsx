import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Use AuthContext

export default function Login() {
  const { login } = useAuth(); // ✅ This is important
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      if (data.role === "admin") {
        sessionStorage.setItem("role", "admin");
        login({ username: credentials.username, role: "admin" }); // ✅ This triggers Navbar update
        navigate("/admin");
      } else if (data.role === "customer") {
        sessionStorage.setItem("role", "customer");
        login({ username: credentials.username, role: "customer" }); // ✅ This triggers Navbar update
        navigate("/customer");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Login Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white py-2">
          Login
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
