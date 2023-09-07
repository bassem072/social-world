import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password, first_name, last_name, gender, birthday, roles },
    thunkAPI
  ) => {
    try {
        const data = await authService.register(username, email, password, first_name, last_name, gender, birthday, roles);
        return {user: data};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login_with_email = createAsyncThunk(
  "auth/login/email",
  async ({ email, password }, thunkAPI) => {
    try {
        const data = await authService.login_with_email(email, password);
        console.log("bassemxyz", data);
        return { user: data };
    } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
  }
);

export const login_with_username = createAsyncThunk(
  "auth/login/username",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await authService.login_with_username(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk(
    'auth/logout',
    () => {
        authService.logout();
    }
);

const initialState = user
  ? {
      isLoading: false,
      isAuthenticated: true,
      isRegister: false,
      user,
    }
  : {
      isLoading: false,
      isAuthenticated: false,
      isRegister: false,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    change: (state, action) => {
      state.isRegister = action.payload;
    },
    refreshToken: (state, action) => {
      state.user = { ...state.user, accessToken: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(login_with_email.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login_with_email.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(login_with_email.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(login_with_username.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login_with_username.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(login_with_username.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const { change, refreshToken } = authSlice.actions;

export default authSlice.reducer;
