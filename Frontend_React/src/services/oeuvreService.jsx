import axios from "axios";

const API_URL = "http://localhost:8080/oeuvre/";

const addOeuvre = (info) => {
  console.log(info);
  return axios.post(`${API_URL}create`, info);
};
const getAll = () => {
  return axios.get(`${API_URL}get_all`);
};
const getOne = (_id) => {
  return axios.get(`${API_URL}get_one/${_id}`);
};
const edit = (_id, info) => {
  return axios.put(`${API_URL}update_info/${_id}`, info);
};
const oeuvreService = {
  addOeuvre,
  getAll,
  getOne,
  edit,
};
export default oeuvreService;
