import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkUserAndPassword = createAsyncThunk(
  'auth/checkUserAndPassword',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8082/userCorrect');
      const user = response.data.find(user => user.username === username && user.password === password);
      if (!user) {
        return rejectWithValue('Invalid username or password');
      }
      else return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create new user noi use try/ catch
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
  
    const response = await axios.get('http://localhost:8082/userCorrect');
      const user = response.data.find(user => user.username === data.username);
      if (user) {
        return rejectWithValue('Username already exists');
      }
      else {
        const response = await axios.post('http://localhost:8082/userCorrect', data);
        const newUser = response.data;
        return newUser;
        
      }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAndPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkUserAndPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create new user
      .addCase (registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase (registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      }
      )

      .addCase (registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
      )
  },
});

export const {actions, reducer} = authSlice;

export default reducer;
