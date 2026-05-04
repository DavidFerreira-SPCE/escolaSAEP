import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // A mesma URL base do seu Insomnia!
});

export default api;
