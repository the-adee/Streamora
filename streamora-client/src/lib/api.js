import axios from "axios";
import { auth } from "./firebase";

// axios instance
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

// attempt to use the freshest token available before each request
apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    try {
      // request a non-forced refresh; callers can force when needed
      const token = await user.getIdToken();
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // quietly proceed without token if something went wrong
    }
  }
  return config;
}, Promise.reject);

export default apiClient;
