import { useSelector } from "react-redux";
import apiRequest from "../Helpers/Utils/Api"
import { showErrorToast, showSuccessToast } from "../Helpers/Utils/ToastUtils";

const UserService = {
    me: async (token) => {
        const bearerToken = { 'Authorization': `Bearer ${token}` };        
        const response = await apiRequest('user/me', 'GET', null, bearerToken);
        return response.data;
    },
    profileUpdate: async (token, firstName, lastName, bio, phone, location) => {
        try {
            const bearerToken = { 'Authorization': `Bearer ${token}` };
            const response = await apiRequest('user/profile', 'PUT', { firstName, lastName, bio, phone, location }, bearerToken);
            showSuccessToast(response.message);
            return response.data;
        } catch (error) {
            showErrorToast(error.message);
        }
    },
    updatePassword: async (token, currentPassword, newPassword) => {
        console.log(token);
        
        try {
            const bearerToken = { 'Authorization': `Bearer ${token}` };
            const response = await apiRequest('user/update-password', 'PUT', { currentPassword, newPassword }, bearerToken);
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            showErrorToast(error.message);
            return response;
        }
    }
}

export default UserService;