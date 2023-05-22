import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";
const countriesServices = {
  getAll: async () => {
    return await axios.get(baseUrl);
  },

  search: async (country) => {
    return await axios.get(`${baseUrl}/${country}`);
  },
};

export default countriesServices;
