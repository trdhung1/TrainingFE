import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import authReducer from './authSlice';


const  store = configureStore({
    reducer: {
        users: employeeReducer,
        auth: authReducer
      
    },
});

export default store;