import React, { useEffect, useState } from "react";
import doctorService from "../services/doctorService";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    degree: "",
    specialization: "",
    hospital: "",
    hospitalNumber: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const res = await doctorService.getAllDoctors();
    setDoctors(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await doctorService.updateDoctor(editingId, form);
    } else {
      await doctorService.addDoctor(form);
    }

    setForm({
      name: "",
      degree: "",
      specialization: "",
      hospital: "",
      hospitalNumber: "",
    });
    setEditingId(null);
    loadDoctors();
  };

  const handleEdit = (doctor) => {
    setForm(doctor);
    setEditingId(doctor.id);
  };

  const handleDelete = async (id) => {
    await doctorService.deleteDoctor(id);
    loadDoctors();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Doctors</h2>

      {/* Add / Update Doctor Form */}
      <div style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Doctor Name" value={form.name} onChange={handleChange} />
        <input name="degree" placeholder="Degree" value={form.degree} onChange={handleChange} />
        <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
        <input name="hospital" placeholder="Hospital" value={form.hospital} onChange={handleChange} />
        <input name="hospitalNumber" placeholder="Hospital Number" value={form.hospitalNumber} onChange={handleChange} />

        <button onClick={handleSubmit}>
          {editingId ? "Update Doctor" : "Add Doctor"}
        </button>
      </div>

      {/* Doctors List */}
      {doctors.map((doc) => (
        <div key={doc.id} style={styles.card}>
          <p><b>{doc.name}</b> ({doc.specialization})</p>
          <button onClick={() => handleEdit(doc)}>Edit</button>
          <button onClick={() => handleDelete(doc.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  },
};

export default ManageDoctors;
