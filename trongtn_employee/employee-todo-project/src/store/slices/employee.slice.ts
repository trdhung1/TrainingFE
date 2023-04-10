import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { iEmployeeType } from "../../types/employee.type";
import employeeApi from "../../api/employee.api";

export interface iEmployeesState {
  employeesList: iEmployeeType[];
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: iEmployeesState = {
  employeesList: [],
  isLoading: false,
  isSuccess: false,
};

export const getAllEmployees = createAsyncThunk<iEmployeeType[]>(
  "employees/getAllEmployees",
  async () => {
    const response = await employeeApi.getAllEmployees();
    return response.data;
  }
);

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        getAllEmployees.fulfilled,
        (state, action: PayloadAction<iEmployeeType[]>) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.employeesList = action.payload;
        }
      )
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
      });
  },
});

export default employeesSlice.reducer;
