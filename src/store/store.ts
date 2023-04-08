import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './reducer';


const store = configureStore({
  reducer: {
    employeesReducer: employeesReducer
  }
});

export default store;