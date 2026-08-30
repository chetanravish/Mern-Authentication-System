import axios from "axios";
import { getAccessToken } from "../context/TokenStore";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials:true
})


axiosInstance.interceptors.request.use(
   (config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
    (error) => {

        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error("Bad Request:", data);
                    break;

                case 401:
                    console.error("Unauthorized:", data);
                    break;

                case 403:
                    console.error("Forbidden:", data);
                    break;

                case 404:
                    console.error("Not Found:", data);
                    break;

                case 500:
                    console.error("Internal Server Error:", data);
                    break;

                default:
                    console.error(`Error (${status}):`, data);
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;