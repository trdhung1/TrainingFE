import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers } from "../services/API";

export interface IEmployee {
  id: number;
  age: number;
  phone: string;
  name: string;
  img?: string;
  isAvailable: boolean;
  address: string;
  email: string;
}

interface EmployeeState {
  users: IEmployee[];
}

const initialState: EmployeeState = {
  users: [],
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getUsers();
  return response.data;
});

const employeeSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IEmployee[]>) => {
        state.users = action.payload;
      }
    );
  },
});

export const { actions, reducer } = employeeSlice;
export default reducer;
