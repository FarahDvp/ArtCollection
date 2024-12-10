import axios from "axios";

const API_URL = "http://localhost:8080/user/";

const login = (info) => {
  return axios.post(`${API_URL}login`, info);
};

const logout = () => {
  localStorage.removeItem("refreshToken");
};

const authService = {
  login,
  logout,
};

export default authService;
