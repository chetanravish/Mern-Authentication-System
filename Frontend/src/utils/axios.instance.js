import axios from "axios";
import { getAccessToken, setCurrentAccessToken } from "../context/TokenStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// Attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Refresh token automatically
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("401 intercepted");
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        setCurrentAccessToken(data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        setCurrentAccessToken(null);
        window.location.href = "/?auth=login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;