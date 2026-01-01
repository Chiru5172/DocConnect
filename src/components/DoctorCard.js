import React from "react";
import "./DoctorCard.css";

function DoctorCard({ doctor, onBook, isRecommended }) {
  return (
    <div className={`doctor-card ${isRecommended ? "recommended" : ""}`}>
      <h3>{doctor.name}</h3>
      <p><b>Degree:</b> {doctor.degree}</p>
      <p><b>Specialization:</b> {doctor.specialization}</p>
      <p><b>Hospital:</b> {doctor.hospital}</p>
      <p><b>Hospital No:</b> {doctor.hospitalNumber}</p>

      {isRecommended && (
        <p style={{ color: "#1976d2", fontWeight: "bold" }}>
          ⭐ Recommended
        </p>
      )}

      <button className="book-btn" onClick={() => onBook(doctor)}>
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorCard;
