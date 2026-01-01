import React, { useState } from "react";
import appointmentService from "../services/appointmentService";
import "./BookAppointmentModel.css";

function BookAppointmentModel({ doctor, user, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = async () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    // ✅ MATCH BACKEND FIELD NAMES EXACTLY
    const appointment = {
      userId: user.id,
      userName: user.username,   // ✅ CORRECT (matches backend)

      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,

      appointmentDate: date,
      appointmentTime: time
    };

    try {
      await appointmentService.bookAppointment(appointment);
      alert("Appointment booked successfully");
      onClose();
    } catch (err) {
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Book Appointment</h3>

        <p><b>Doctor:</b> {doctor.name}</p>
        <p><b>Specialization:</b> {doctor.specialization}</p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleBook} className="book-btn">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookAppointmentModel;
