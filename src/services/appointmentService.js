import axios from "axios";

const API = "http://localhost:9000/appointments";

// User
const getUserAppointments = (userId) =>
  axios.get(`${API}/user/${userId}`);

const deleteAppointment = (id) =>
  axios.delete(`${API}/${id}`);

const bookAppointment=(data)=>{
  return axios.post(API,data)
}

const markCompleted = (id) =>
  axios.put(`${API}/complete/${id}`);

// Admin
const getAllAppointments = () =>
  axios.get(`${API}/all`);

export default {
  bookAppointment,
  getUserAppointments,
  deleteAppointment,
  getAllAppointments,
  markCompleted
};
