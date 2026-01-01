import axios from "axios";

const AUTH_URL = "http://localhost:9000/auth";

const login = async (credentials) => {
  const response = await axios.post(`${AUTH_URL}/login`, credentials);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const signup = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/signup`, userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  signup,
  logout,
  getCurrentUser,
};
