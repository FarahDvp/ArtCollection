import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import ReserveService from "../services/reserveService";
import Toastfunction from "../utils/ToastFunction";

export const getAllReserveByOeuvre = createAsyncThunk(
  "Reserve/getAllReserveByOeuvre",
  async (_id, thunkAPI) => {
    try {
      const response = await ReserveService.getAllByIdOeuvre(_id);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteReserve = createAsyncThunk(
  "user/deleteReserve",
  async (_id, thunkAPI) => {
    try {
      const response = await ReserveService.deleteOne(_id);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addReserve = createAsyncThunk(
  "Reserve/addReserve",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(_id);
      const response = await ReserveService.add(_id, info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editReserve = createAsyncThunk(
  "Reserve/editReserve",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(info);

      const response = await ReserveService.edit(_id, info);
      console.log(response.data);
      return { _id, info };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const reserveSlice = createSlice({
  name: "Reserve",
  initialState: {
    ReserveList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addReserve.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
      state.loading = false;
    },
    [addReserve.pending]: (state) => {
      state.loading = true;
      state.succes = false;
    },
    [addReserve.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      console.log(action.payload.data);
      state.ReserveList.push(action.payload.data);
    },
    [getAllReserveByOeuvre.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllReserveByOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.ReserveList = action.payload.data;
    },
    [getAllReserveByOeuvre.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteReserve.pending]: (state) => {
      state.succes = false;
    },
    [deleteReserve.fulfilled]: (state, action) => {
      state.ReserveList = state.ReserveList.filter(
        (item) => item._id !== action.payload
      );
      const message = "Reserve supprimer  avec succès";
      Toastfunction.TaostSuccess(message);
    },
    [deleteReserve.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer } = reserveSlice;
export default reducer;
