import axios from "axios";

const getAll = () => {
  return axios.get("https://flagcdn.com/fr/codes.json");
};

const nationaliteAPI = {
  getAll,
};
export default nationaliteAPI;
