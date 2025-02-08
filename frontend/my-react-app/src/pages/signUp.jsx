import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authAPI";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username && email && password) {
      await signup({ username, email, password });
      localStorage.setItem("user", username);

      navigate("/home");
    } else {
      setError("Please fill out all fields.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Sign Up</h1>
      </header>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      {/* Link to login page */}
      <div style={styles.loginLink}>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  loginLink: {
    marginTop: "10px",
  },
};

export default Signup;
