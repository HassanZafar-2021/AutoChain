import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../util/auth.js"; // Handles token storage
import { login } from "../api/authAPI.js"; // Calls the backend login API
import { UserLogin } from "../interfaces/UserLogin.js";

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [loginData, setLoginData] =
    useState <
    UserLogin >
    {
      username: "",
      email: "",
      password: "",
    };

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔍 Sending login request with:", loginData);
      const data = await login(loginData);

      if (data?.token) {
        console.log("✅ Login successful, received token:", data.token);
        localStorage.setItem("user", loginData.username);
        Auth.login(data.token); // Save token in localStorage/cookies
        navigate("/home"); // Redirect to homepage
      } else {
        console.error("❌ Login failed: Invalid credentials");
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="form-container">
      <form className="form login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={loginData.username || ""}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={loginData.email || ""}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>

      <div className="signup-link">
        <p>
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
