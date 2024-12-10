import axios from "axios";

const API_URL = "http://localhost:8080/bibliographie/";

const getAllByIdOeuvre = (_id) => {
  return axios.get(`${API_URL}get_all/${_id}`);
};

const add = (_id, info) => {
  return axios.post(`${API_URL}create/${_id}`, info);
};
const edit = (_id, info) => {
  return axios.put(`${API_URL}update_info/${_id}`, info);
};

const deleteOne = (_id) => {
  return axios.delete(`${API_URL}delete_one/${_id}`);
};
const bibliographieService = {
  getAllByIdOeuvre,
  edit,
  deleteOne,
  add,
};

export default bibliographieService;
