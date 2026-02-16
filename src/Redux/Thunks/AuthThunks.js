import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Helpers/Utils/Api";
import { login,logout } from "../Slices/AuthSlice";

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch }) => {
        try {
            const { data } = await api.post('/auth/refresh');
            dispatch(login({
                accessToken: data.data.accessToken,
                user: data.data.user
            }))
        } catch (error) {
            dispatch(logout());
        }
    }
)