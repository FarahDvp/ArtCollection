import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import adminService from "../services/adminService";

export const getAllAdmin = createAsyncThunk("user/getAllAdmin", async () => {
  const response = await adminService.getAll();

  return response.data.data;
});

export const deleteAdmin = createAsyncThunk(
  "user/deleteAdmin",
  async (_id, thunkAPI) => {
    try {
      const response = await adminService.deleteOne(_id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addAdmin = createAsyncThunk(
  "user/addAdmin",
  async (adminInfo, thunkAPI) => {
    try {
      const response = await adminService.addAdmin(adminInfo);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    isRegistred: false,
    adminList: [],
    loading: false,
    succes: false,
    error: "",
  },
  reducers: {
    deleteItem: (state, action) => {
      const itemId = action.payload;
      console.log(itemId);
      return state.adminList.filter((item) => item._id !== itemId);
    },
  },
  extraReducers: {
    [getAllAdmin.pending]: (state, action) => {
      state.loading = true;
      state.succes = false;
    },
    [getAllAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      state.adminList = action.payload;
    },
    [getAllAdmin.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [deleteAdmin.pending]: (state) => {
      state.succes = false;
    },
    [deleteAdmin.fulfilled]: (state, action) => {
      state.succes = true;
    },
    [deleteAdmin.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [addAdmin.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [addAdmin.pending]: (state) => {
      state.succes = false;
    },
    [addAdmin.fulfilled]: (state, action) => {
      state.succes = true;
      state.adminList.push(action.payload.data);
    },
  },
});

const { reducer } = userSlice;
export const { deleteItem } = userSlice.actions;

export default reducer;
