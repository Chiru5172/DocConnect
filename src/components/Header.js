import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login"; // ✅ direct navigation, no crash
  };

  return (
    <div style={styles.header}>
      {/* Left */}
      <div style={styles.left}>
        <h2 style={{ margin: 0 }}>Doc Connect</h2>
      </div>

      {/* Right */}
      <div style={styles.right}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/doctors" style={styles.link}>Doctors</Link>

        {user?.role === "ADMIN" && (
          <Link to="/manage-doctors" style={styles.link}>
            Manage Doctors
          </Link>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/admin-appointments" style={styles.link}>
            All Appointments
          </Link>
        )}

        <Link to="/appointments" style={styles.link}>Appointments</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 25px",
    backgroundColor: "#1976d2",
    color: "white",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "#d32f2f",
    border: "none",
    color: "white",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Header;
