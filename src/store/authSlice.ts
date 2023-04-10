import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authUrl } from '../services/instance';


 export interface IUser {
  username: string;
  password: string;
}

interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ username, password }: IUser, { rejectWithValue }) => {
    try {
      const response = await authUrl.get<IUser[]>('/userCorrect');
      const user = response.data.find(
        (user: IUser) => user.username === username && user.password === password
      );
      if (!user) {
        return rejectWithValue('Invalid username or password');
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return user;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: IUser, { rejectWithValue }) => {
    const response = await authUrl<IUser[]>('/userCorrect');
    const user = response.data.find((user: IUser) => user.username === data.username);
    if (user) {
      return rejectWithValue('Username already exists');
    } else {
      const response = await authUrl.post<IUser>('/userCorrect', data);
      const newUser = response.data;
      return newUser;
    }
  }
);

const  initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('User');
    },
    loginWidthLocalstorage: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('User', JSON.stringify(action.payload));
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // create new user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
        state.error = null;
        state.successMessage = 'User created successfully';
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { actions, reducer } = authSlice;

export const { logout, loginWidthLocalstorage } = actions;

export default reducer;
