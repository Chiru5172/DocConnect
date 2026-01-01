import React, { useState } from "react";
import axios from "axios";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  const handleUpdate = async () => {
    const res = await axios.put(
      `http://localhost:9000/users/${user.id}`,
      user
    );
    localStorage.setItem("user", JSON.stringify(res.data));
    alert("Profile updated successfully");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>My Profile</h2>

        <div style={styles.field}>
          <label>Full Name</label>
          <input
            type="text"
            value={user.fullName}
            onChange={(e) =>
              setUser({ ...user, fullName: e.target.value })
            }
          />
        </div>

        <div style={styles.field}>
          <label>Age</label>
          <input
            type="number"
            value={user.age}
            onChange={(e) =>
              setUser({ ...user, age: e.target.value })
            }
          />
        </div>

        <div style={styles.field}>
          <label>Mobile Number</label>
          <input
            type="text"
            value={user.mobile}
            onChange={(e) =>
              setUser({ ...user, mobile: e.target.value })
            }
          />
        </div>

        <button style={styles.button} onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  card: {
    width: "380px",
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1976d2",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Profile;
