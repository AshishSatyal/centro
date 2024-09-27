import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAxios = () => {
  const { authTokens, setTokens } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000", // Your API's base URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor to add the access token to the headers
  axiosInstance.interceptors.request.use(
    (config) => {
      if (authTokens?.access) {
        config.headers.Authorization = `Bearer ${authTokens.access}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token expiration
  axiosInstance.interceptors.response.use(
    (response) => response, // If the response is successful, return it
    async (error) => {
      const originalRequest = error.config;

      // If we receive a 401 status and the token is expired, try refreshing it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          const refreshResponse = await axios.post(
            "http://127.0.0.1:8000/centroApp/token/refresh/", // Refresh token endpoint
            {
              refresh: authTokens.refresh, // Send the refresh token
            }
          );

          if (refreshResponse.status === 200) {
            const { access } = refreshResponse.data;

            // Update tokens in context with the new access token
            setTokens({
              access,
              refresh: authTokens.refresh, // Keep the refresh token
            });

            // Retry the original request with the new access token
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          // Handle refresh token expiration (e.g., redirect to login)
          console.error("Refresh token failed. Please log in again.");
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
