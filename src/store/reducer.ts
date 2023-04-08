import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployeeApi, createEmployeeApi, putEmployeeApi, deleteEmployeeApi } from '../uttils/intance'
import { IEmployee } from '../interface/employee.interface';


export const fetchEmployees = createAsyncThunk(
    'employee/fetch',
    async () => {
        const response = await getEmployeeApi();
        return response.data
    }
);

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (data:IEmployee, thunkAPI) => {
        await createEmployeeApi(data);
        thunkAPI.dispatch(fetchEmployees());
    }
)

export const putEmployee = createAsyncThunk(
    'employee/putEmployee',
    async ({ id, data }: { id: number, data:IEmployee }, thunkAPI) => {
        await putEmployeeApi(id, data);
        thunkAPI.dispatch(fetchEmployees());
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id: number, thunkAPI) => {
        try {
            await deleteEmployeeApi(id);
            thunkAPI.dispatch(fetchEmployees());
        } catch (error) {
            console.log(error);
        }
    }
)

interface IEmployeesReducer {
    listEmployee:IEmployee[];
    status: 'loading' | 'error';
}

const initialState:IEmployeesReducer = {
    listEmployee: [],
    status: 'loading',
};

const employeesReducer = createSlice({
    name: 'employee',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // Handle fetchUsers API request
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.listEmployee = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.listEmployee = []
            })
            .addCase(addEmployee.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                // state.listEmployee = action.payload;
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.listEmployee = []
            })
            .addCase(putEmployee.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(putEmployee.fulfilled, (state, action) => {

            })
            .addCase(putEmployee.rejected, (state, action) => {
                state.listEmployee = []
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {

            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.listEmployee = []
            })
    },
});

export default employeesReducer.reducer
