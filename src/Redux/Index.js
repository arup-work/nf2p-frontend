import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slices/AuthSlice';
import flashReducer from './Slices/FlashSlice';

const reduxStore = configureStore({
    reducer: {
        auth: authReducer,
        flash: flashReducer
    }
})

export default reduxStore;