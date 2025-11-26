import apiRequest from "../Helpers/Utils/Api"
import { showErrorToast, showSuccessToast } from "../Helpers/Utils/ToastUtils";

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await apiRequest('/auth/login', "POST", { email, password });
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            showErrorToast(error.message);
        }
    }
}

export default AuthService;