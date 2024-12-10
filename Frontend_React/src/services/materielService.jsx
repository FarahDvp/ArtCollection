import axios from "axios";

const API_URL = "http://localhost:8080/materiel/";

const addMateriel = (info) => {
  console.log(info);
  return axios.post(`${API_URL}create`, info);
};

const getAll = () => {
  console.log("a");
  return axios.get(`${API_URL}get_all`);
};

const deleteOne = (_id) => {
  return axios.get(`${API_URL}delete_one/${_id}`);
};
const deleteMany = () => {
  return axios.get(`${API_URL}delete_one/`);
};

const MaterielService = {
  addMateriel,
  getAll,
  deleteOne,
  deleteMany,
};
export default MaterielService;
