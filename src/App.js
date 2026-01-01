import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import ManageDoctors from "./pages/ManageDoctors";
import AdminAppointments from "./pages/AdminAppointments";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <BrowserRouter>
      {user && <Header />}

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        <Route path="/doctors" element={user ? <Doctors /> : <Navigate to="/login" />} />
        <Route path="/appointments" element={user ? <Appointments /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

        <Route
          path="/manage-doctors"
          element={user && user.role === "ADMIN" ? <ManageDoctors /> : <Navigate to="/" />}
        />

        <Route
          path="/admin-appointments"
          element={user && user.role === "ADMIN" ? <AdminAppointments /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ✅ Footer visible on all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
