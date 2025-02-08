import axios from "axios";

const axiosBaseUrl = "http://localhost:3000";

const instance = axios.create({
  baseURL: `${axiosBaseUrl}/api/`,
  withCredentials: true,
});

export default instance;
