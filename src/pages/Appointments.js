import React, { useEffect, useState } from "react";
import appointmentService from "../services/appointmentService";
import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const res = await appointmentService.getUserAppointments(user.id);
    setAppointments(res.data);
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await appointmentService.deleteAppointment(id);
      loadAppointments();
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-card">
        <h2 className="appointments-title">My Appointments</h2>

        {appointments.length === 0 ? (
          <p className="empty-text">No appointments booked yet</p>
        ) : (
          appointments.map((appt) => (
            <div className="appointment-item" key={appt.id}>
              <div className="appointment-details">
                <p><b>Doctor:</b> {appt.doctorName}</p>
                <p><b>Specialization:</b> {appt.specialization}</p>
                <p><b>Date:</b> {appt.appointmentDate}</p>
                <p><b>Time:</b> {appt.appointmentTime}</p>

                {/* ✅ STATUS DISPLAY */}
                <p>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        appt.status === "Booked"
                          ? "#1976d2"
                          : appt.status === "Completed"
                          ? "#2e7d32"
                          : "#d32f2f",
                    }}
                  >
                    {appt.status}
                  </span>
                </p>
              </div>

              {/* ❌ Cancel only if Booked */}
              {appt.status === "Booked" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(appt.id)}
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Appointments;
