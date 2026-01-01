import React, { useEffect, useState } from "react";
import appointmentService from "../services/appointmentService";
import "./AdminAppointments.css";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAllAppointments();
  }, []);

  const loadAllAppointments = async () => {
    const res = await appointmentService.getAllAppointments();
    setAppointments(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this appointment?")) {
      await appointmentService.deleteAppointment(id);
      loadAllAppointments();
    }
  };

  const handleComplete = async (id) => {
    if (window.confirm("Mark this appointment as completed?")) {
      await appointmentService.markCompleted(id);
      loadAllAppointments();
    }
  };

  return (
    <div className="admin-appt-page">
      <div className="admin-appt-card">
        <h2 className="admin-title">All Appointments</h2>

        {appointments.length === 0 ? (
          <p className="empty-text">No appointments found</p>
        ) : (
          appointments.map((appt) => (
            <div className="admin-appt-item" key={appt.id}>
              <div className="admin-appt-details">
                <p><b>User:</b> {appt.userName || "N/A"}</p>
                <p><b>Doctor:</b> {appt.doctorName}</p>
                <p><b>Specialization:</b> {appt.specialization}</p>
                <p><b>Date:</b> {appt.appointmentDate}</p>
                <p><b>Time:</b> {appt.appointmentTime}</p>

                {/* STATUS */}
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

              {/* ADMIN ACTIONS */}
              <div className="admin-actions">
                {appt.status === "Booked" && (
                  <button
                    className="complete-btn"
                    onClick={() => handleComplete(appt.id)}
                  >
                    Mark Completed
                  </button>
                )}

                <button
                  className="cancel-btn"
                  onClick={() => handleDelete(appt.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminAppointments;
