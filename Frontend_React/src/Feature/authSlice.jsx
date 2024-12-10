import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import authService from "../services/authService";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (info, thunkAPI) => {
    try {
      const response = await authService.login(info);
      console.log(response.data);
      if (response.data) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
        axios.defaults.headers.common.authorization = `Bearer ${response.data.token}`; // fi kol request tab3iith lheader maah
      }
      return response.data.user;
    } catch (error) {
      console.log("Error", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    errorUserName: false,
    errorPassword: false,
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log(action.payload.message);
      if (action.payload.message === "Please verify your username") {
        state.errorUserName = true;
      } else {
        state.errorPassword = true;
      }
    },
    [userLogin.pending]: (state, action) => {
      state.errorUserName = false;
      state.errorPassword = false;
    },

    [userLogout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
