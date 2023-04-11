import { createSlice } from "@reduxjs/toolkit";

export interface iAuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: iAuthState = {
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    loginFailed(state, action) {
      state.isLoading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
