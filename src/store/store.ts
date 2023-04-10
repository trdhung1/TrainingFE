import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import authReducer from './authSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const  store = configureStore({
    reducer: {
        users: employeeReducer,
        auth: authReducer
      
    },
});

export default store;