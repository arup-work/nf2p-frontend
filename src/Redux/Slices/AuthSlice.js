import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialAuthState = {
    isAuthenticated: !!token,
    auth: { token: token || null, user: user || null }
}

const authenticateSlice = createSlice({
    name: 'authenticated',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            const { token, user } = action.payload;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            state.isAuthenticated = true;
            state.auth = { token, user }
        },
        logout(state, action) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            state.isAuthenticated = false;
            state.auth = initialAuthState.auth
        }
    }
})

export const { login, logout } = authenticateSlice.actions;
export default authenticateSlice.reducer;
