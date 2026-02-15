import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const user = (() => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
})();

const initialAuthState = {
    isAuthenticated: false,
    user: { firstName: '', lastName: '', email: '', id: '' },
    token: null,
}

const authenticateSlice = createSlice({
    name: 'authenticated',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            const { token, user } = action.payload;
            console.log(action.payload)

            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
        },

        mE(state, action) {
            const { user } = action.payload;
            state.user = user;
        },

        logout(state, action) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            state.isAuthenticated = false;
            state.user = initialAuthState.user;
            state.token = initialAuthState.token;
        }
    }
})

export const { login, mE, logout } = authenticateSlice.actions;
export default authenticateSlice.reducer;
