import axios from "axios";
console.log(import.meta.env.VITE_MZ_STORE);

const api = axios.create({
  baseURL: import.meta.env.VITE_MZ_STORE,
  headers: { "Content-Type": "application/json" },
});

//interceptors => add token autmatcily

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
