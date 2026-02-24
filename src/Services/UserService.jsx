import { useSelector } from "react-redux";
import apiRequest from "../Helpers/Utils/Api"
import { showErrorToast, showSuccessToast } from "../Helpers/Utils/ToastUtils";
import api from "../Helpers/Utils/Api";

const UserService = {
    me: async () => {
        const response = await api.get('/user/me');
        return response.data;
    },
    logout: async () => {
        const response = await api.post('user/logout');
        return response.data;
    },
    profileUpdate: async (firstName, lastName, bio, phone, location) => {
        try {
            const response = await api.post('/user/profile', { firstName, lastName, bio, phone, location });
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