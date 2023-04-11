import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers, deleteUser, addUser, updateUser } from "../services/API";

export interface IEmployee {
  id?: number 
  age: number;
  phone: string;
  name: string;      
  img?: string;
  isAvailable?: boolean;
  address: string;
  email: string;
}

interface EmployeeState {
  users: IEmployee[];
  employeeID: number;
}

const initialState: EmployeeState = {
  users: [],
  employeeID: 0,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getUsers();
  return response.data;
});

// search by name  user name
export const searchUser = createAsyncThunk(
  "users/searchUser",
  async (name: string) => {
    const response = await getUsers();
    const data = response.data.filter((user: IEmployee) => {
      return user.name.toLowerCase().includes(name.toLowerCase());
    });
    return data;
  }
);





// add user 
export const addEmployee = createAsyncThunk(
  "users/addEmployee",
  async (user: IEmployee) => {
    const response = await addUser(user);
    return response.data;
  }
);

export const editEmployee = createAsyncThunk(
  "users/editEmployee",
  async (user: IEmployee) => {
    const response = await updateUser(user);
    return response.data;
  }
);

// delete user
export const deleteEmployee = createAsyncThunk(
  "users/deleteEmployee",
  async (id: number) => {
    const response = await deleteUser(id);
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setEmployeeID: (state, action: PayloadAction<number>) => {
      state.employeeID = action.payload;
    }


  },
  extraReducers: (builder) => {
    builder
    .addCase(
      fetchUsers.fulfilled,
      (state, action) => {
        state.users = action.payload;
      }
    )
    .addCase(addEmployee.fulfilled, (state, action) => {
      state.users = [action.payload, ...state.users]
    })
    .addCase(editEmployee.fulfilled, (state, action) => {
      state.users = action.payload;
    })

    .addCase(deleteEmployee.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(searchUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    
 
  },
});

export const { actions, reducer } = employeeSlice;

export const { setEmployeeID } = actions;
export default reducer;


