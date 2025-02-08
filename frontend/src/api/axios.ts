import axios from "axios";

const axiosBaseUrl = process.env.VITE_CORS_ORIGIN || "http://localhost:3000";

const instance = axios.create({
  baseURL: axiosBaseUrl,
  withCredentials: true,
});

export default instance;
