import { createSlice } from "@reduxjs/toolkit";
import { initializeAuth } from "../Thunks/AuthThunks";


const initialAuthState = {
  isAuthenticated: false,
  user: { firstName: '', lastName: '', email: '', id: '' },
  token: null,
  isAuthLoading: true
}

const authenticateSlice = createSlice({
  name: 'authenticated',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.isAuthLoading = false;
    },

    mE(state, action) {
      const { user } = action.payload;
      state.user = user;
    },

    logout(state, action) {
      console.log("here");
      
      state.isAuthenticated = false;
      state.user = initialAuthState.user;
      state.token = null;
      state.isAuthLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
    // When initializeAuth starts
    .addCase(initializeAuth.pending, (state) => {
      state.isAuthLoading = true;
    })
    // When initializeAuth succeeds (but we already dispatch login inside thunk)
    .addCase(initializeAuth.fulfilled, (state) => {
      state.isAuthLoading = false;
    })
    // When initializeAuth fails
    .addCase(initializeAuth.rejected, (state) => {
      state.isAuthLoading = false;
    })
  }
})

export const { login, mE, logout } = authenticateSlice.actions;
export default authenticateSlice.reducer;
