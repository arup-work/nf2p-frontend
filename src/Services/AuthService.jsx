import apiRequest from "../Helpers/Utils/Api"
import { showErrorToast, showSuccessToast } from "../Helpers/Utils/ToastUtils";

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await apiRequest('auth/login', "POST", { email, password });
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            showErrorToast(error.message);
        }
    },

    register: async (firstName, lastName, email, password) => {
        try {
            const response = await apiRequest('auth/register', "POST", { firstName, lastName, email, password });
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Registration failed";
            showErrorToast(message);
            throw error;
        }
    },

    forgetPassword: async (email) => {
        try {
            const response = await apiRequest('auth/forgot-password', "POST", { email });
            showSuccessToast(response.message);
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
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Password recovery failed";
            showErrorToast(message);
            throw error;
        }
    }
}

export default AuthService;