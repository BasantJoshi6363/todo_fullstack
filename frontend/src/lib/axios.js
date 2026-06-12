import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true 
});

// We removed the success handler that was stripping response.data!
axiosInstance.interceptors.response.use(
    (response) => response, // Just pass the normal response through safely
    async (error) => {
        const originalRequest = error.config;

        // If 401 and we haven't retried this specific request yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Hit the refresh endpoint smoothly
                await axiosInstance.post(`/auth/refresh`);

                // Retry the original request with the fresh cookie
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Session expired. Redirecting...");
                window.location.href = '/signup';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);