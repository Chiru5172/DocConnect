import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    age: "",
    mobile: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.signup(form);
    navigate("/login");
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
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />

          <input
            placeholder="Mobile Number"
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p style={styles.redirectText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
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
    maxWidth: "380px",
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
  redirectText: {
    marginTop: "15px",
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signup;
