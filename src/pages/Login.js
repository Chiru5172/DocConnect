import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await authService.login({ username, password });

      if (!user) {
        setError("Invalid username or password");
        return;
      }

      // Force reload so App reads updated user
      window.location.href = "/";
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.page}>
      {/* Application Title */}
      <div style={styles.titleBox}>
        <h1 style={styles.appTitle}>Doc Connect</h1>
        <p style={styles.subtitle}>
          Book your doctor appointment easily
        </p>
      </div>

      <div style={styles.container}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p style={styles.redirectText}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
  },
  titleBox: {
    textAlign: "center",
    marginBottom: "20px",
  },
  appTitle: {
    color: "#1976d2",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#555",
    fontSize: "14px",
  },
  container: {
    maxWidth: "350px",
    width: "100%",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  error: {
    color: "red",
  },
  redirectText: {
    marginTop: "15px",
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
