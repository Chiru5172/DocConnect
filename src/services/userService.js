import axios from "axios";

const USER_URL = "http://localhost:9000/users";

const getUserById = (id) => {
  return axios.get(`${USER_URL}/${id}`);
};

const updateUser = (id, userData) => {
  return axios.put(`${USER_URL}/${id}`, userData);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserById,
  updateUser,
};
