import React, { useEffect, useState } from "react";
import doctorService from "../services/doctorService";
import DoctorCard from "../components/DoctorCard";
import BookAppointmentModel from "../components/BookAppointmentModel";
import MedicalBot from "../components/MedicalBot";
import "./Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [recommended, setRecommended] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const res = await doctorService.getAllDoctors();
    setDoctors(res.data);
  };

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleRecommendation = (specialization) => {
    setRecommended(specialization);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  const filteredDoctors = recommended
    ? doctors.filter(
        (d) =>
          d.specialization.toLowerCase() ===
          recommended.toLowerCase()
      )
    : doctors;

  return (
    <div className="doctors-container">
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Available Doctors
        </h2>

        {recommended && (
          <p className="filter-text">
            Recommended Specialist: <b>{recommended}</b>
          </p>
        )}

        <div className="doctors-grid">
          {filteredDoctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onBook={handleBook}
              isRecommended={recommended &&
                doc.specialization.toLowerCase() ===
                recommended.toLowerCase()}
            />
          ))}
        </div>
      </div>

      {/* Floating Medical Bot */}
      <MedicalBot onRecommend={handleRecommendation} />

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookAppointmentModel
          doctor={selectedDoctor}
          user={user}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Doctors;
