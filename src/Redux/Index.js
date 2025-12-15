import { configureStore } from "@reduxjs/toolkit";
import counterReducer  from './Slices/AuthSlice';

const reduxStore = configureStore({
    reducer: {
        auth: counterReducer 
    }
})

export default reduxStore;