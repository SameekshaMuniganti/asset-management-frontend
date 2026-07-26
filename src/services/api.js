import axios from "axios";

const api = axios.create({
    baseURL: "https://asset-management-b0dmbrdehecgamcp.southindia-01.azurewebsites.net"
});

api.interceptors.request.use((config) => {

    if (
        config.url !== "/api/users/login" &&
        config.url !== "/api/users/register"
    ) {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    error => {

        if (
            error.response?.status === 401 ||
            error.response?.status === 403
        ) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;