import axios from "axios";

const BASE_URL = "http://localhost:9000/doctors";

const getAllDoctors = () => axios.get(BASE_URL);
const addDoctor = (doctor) => axios.post(BASE_URL, doctor);
const updateDoctor = (id, doctor) => axios.put(`${BASE_URL}/${id}`, doctor);
const deleteDoctor = (id) => axios.delete(`${BASE_URL}/${id}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
