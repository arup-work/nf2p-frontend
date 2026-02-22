import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Helpers/Utils/Api";
import { login, logout } from "../Slices/AuthSlice";

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    try {
      const response = await api.post('/auth/refresh');
const data = response.data;

      if (data?.success) {
        const token = data?.data?.token || data?.token;
        const user = data?.data?.user || data?.user;

        if (token && user) {
          dispatch(login({ token, user }));
        } else {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    }

    console.log("[Thunk] initializeAuth finished");
  }
);