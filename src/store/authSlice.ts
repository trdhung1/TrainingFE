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

interface ILoginResponse {
  token: string;
}

interface ILoginPayload {
  username: string;
  password: string;
}


// "email": "eve.holt@reqres.in",
// "password": "cityslicka"
export const login = createAsyncThunk<string, ILoginPayload>(
  'auth/login',
  async ({ username, password }) => {
    const response = await authUrl.post<ILoginResponse>('/login',{email:username, password} );
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
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
      localStorage.removeItem('token');
    },
   setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      //login and save token in localstorage
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.successMessage = 'Login successfully';
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Invalid username or password'
      })
  },
});

export const { actions, reducer } = authSlice;

export const { logout, setIsAuthenticated } = actions;

export default reducer;
