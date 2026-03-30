import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAuth;
