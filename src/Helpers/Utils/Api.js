import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 10000,
    withCredentials: true,
})

// Optional: default headers (you can override per request)
api.defaults.headers.common['Content-Type'] = 'application/json';

// ───────────────────────────────────────────────
//          Automatic Access Token + Refresh Logic
// ───────────────────────────────────────────────

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
}

// Response interceptor - catches 401 → tries to refresh → retries original request
api.interceptors.response.use(
    (response) => response, // success → just return
    async (error) => {
        const originalRequest = error.config;

        // If we already tried refreshing once → don't loop forever
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue the request until refresh finishes
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        // originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call your refresh endpoint (cookie is sent automatically!)
                const { data } = await api.post('/auth/refresh');

                const newAccessToken = data.accessToken;

                // 1. Save new access token somewhere (localStorage / context / zustand)
                localStorage.setItem('accessToken', newAccessToken); // ← example

                // 2. Update default header for future requests
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                // 3. Update the original request header too
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Resolve all queued requests
                processQueue(null, newAccessToken);

                // Retry the original request with new token
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed → probably refresh token expired → logout
                processQueue(refreshError, null);

                // Optional: dispatch logout action, redirect to login
                window.location.href = '/';
                localStorage.removeItem('accessToken');

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Not 401 or already retried → just throw normal error
        return Promise.reject(error);
    }
);

// Request interceptor - automatically add token if exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

// const apiRequest = async (endpoint, method, body, headers) => {
//     try {
//         const BASE_URL = 'http://localhost:8000/api/v1';
//         const url = `${BASE_URL}/${endpoint}`;
//         const response = await axios({
//             url,
//             method,
//             data: method != 'GET' ? body : undefined,
//             headers
//         })

//         // Return response data
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : new Error("An unexpected error occurred");
//     }
// }

export default api;