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

    register: async (name, email, password) => {
        try {
            const response = await apiRequest('auth/register', "POST", { name, email, password });
            showSuccessToast(response.message);
            console.log(response);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Registration failed";
            showErrorToast(message);
            throw error;
        }
    }
}

export default AuthService;