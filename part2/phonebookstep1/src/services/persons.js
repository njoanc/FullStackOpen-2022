import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const personService = {
  search: async () => {
    return await axios.get(baseUrl);
  },

  create: async (newData) => {
    return await axios.post(baseUrl, newData);
  },

  deleteOne: async (id) => {
    try {
      return await axios.delete(`${baseUrl}/${id}`);
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
};

export default personService;
