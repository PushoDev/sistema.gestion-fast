import axios from "axios";
import Cookies from "js-cookie";

const authApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authApi;
