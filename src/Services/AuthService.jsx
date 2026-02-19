import api from "../Helpers/Utils/Api";
import apiRequest from "../Helpers/Utils/Api"
import { showErrorToast, showSuccessToast } from "../Helpers/Utils/ToastUtils";

const AuthService = {
    login: async (email, password) => {
        try {
            // const response = await apiRequest('auth/login', "POST", { email, password });
            const response = await api.post("auth/login",{email, password});
            showSuccessToast(response?.data?.message);
            return response;
        } catch (error) {
            const msg = error.response?.data?.message || "Login failed. Please try again.";
            showErrorToast(msg);
        }
    },

    register: async (firstName, lastName, email, password) => {
        try {
            const response = await api.post('auth/register', { firstName, lastName, email, password });
            showSuccessToast(response?.data?.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Registration failed";
            showErrorToast(message);
            throw error;
        }
    },

    forgetPassword: async (email) => {
        try {
            const response = await api.post('auth/forgot-password', { email });
            showSuccessToast(response?.data?.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Password recovery failed";
            showErrorToast(message);
            throw error;
        }
    },

    resetPassword: async (password, token) => {
        try {
            const response = await apiRequest(`auth/reset-password/${token}`, "POST", { password });
            showSuccessToast(response?.data?.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Password recovery failed";
            showErrorToast(message);
            throw error;
        }
    }
}

export default AuthService;