import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUsers} from '../services/API';



//thunk 

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getUsers();
    return response.data;
});


//slice

const initialState = {
    users: [],
}

const employeeSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder

        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        }
    )
    }
});

export const  {actions, reducer}  = employeeSlice;

export default reducer;