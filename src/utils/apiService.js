import axios from "axios";

const apiService = axios.create({
  // baseURL: 'http://localhost:5005/',
  baseURL: "https://apiklinikintan.soemantry.com/",
  timeout: 60000,
});

export default apiService;
