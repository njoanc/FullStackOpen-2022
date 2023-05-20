import axios from "axios";

const baseUrl = "http://localhost:3002/notes";

const noteService = {
  getAll: async () => {
    return await axios.get(baseUrl);
  },

  create: async (newObject) => {
    return await axios.post(baseUrl, newObject);
  },

  update: async (id, newObject) => {
    return await axios.put(`${baseUrl}/${id}`, newObject);
  },
};

export default noteService;
