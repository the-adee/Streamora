import axios from "axios";
import { auth } from "./firebase";

// axios instance
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
