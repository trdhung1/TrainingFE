import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import authReducer from './authSlice';
import modalReducer from './modalSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const  store = configureStore({
    reducer: {
        users: employeeReducer,
        auth: authReducer,
        modal: modalReducer
      
    },
});

export default store;