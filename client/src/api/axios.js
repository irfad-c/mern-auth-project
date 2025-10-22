import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });
API.interceptors.request.use((config) => {
  const storage = localStorage.getItem("user");
  if (storage) {
    const user = JSON.parse(storage);
    if (user.token) config.headers.Authorization = "Bearer " + user.token;
  }
  return config;
});
export default API;
