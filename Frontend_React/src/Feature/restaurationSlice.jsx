import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import RestaurationService from "../services/restaurationService";
import Toastfunction from "../utils/ToastFunction";

export const getAllRestaurationByOeuvre = createAsyncThunk(
  "restauration/getAllRestaurationByOeuvre",
  async (_id, thunkAPI) => {
    try {
      const response = await RestaurationService.getAllByIdOeuvre(_id);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteRestauration = createAsyncThunk(
  "user/deleteRestauration",
  async (_id, thunkAPI) => {
    try {
      const response = await RestaurationService.deleteOne(_id);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addRestauration = createAsyncThunk(
  "Restauration/addRestauration",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(_id);
      const response = await RestaurationService.add(_id, info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editRestauration = createAsyncThunk(
  "restauration/editRestauration",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(info);

      const response = await RestaurationService.edit(_id, info);
      console.log(response.data);
      return { _id, info };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const restaurationSlice = createSlice({
  name: "Restauration",
  initialState: {
    RestaurationList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addRestauration.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [addRestauration.pending]: (state) => {
      state.succes = false;
    },
    [addRestauration.fulfilled]: (state, action) => {
      state.succes = true;
      console.log(action.payload.data);
      state.RestaurationList.push(action.payload.data);
    },
    [getAllRestaurationByOeuvre.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllRestaurationByOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.RestaurationList = action.payload.data;
    },
    [getAllRestaurationByOeuvre.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteRestauration.pending]: (state) => {
      state.succes = false;
    },
    [deleteRestauration.fulfilled]: (state, action) => {
      state.RestaurationList = state.RestaurationList.filter(
        (item) => item._id !== action.payload
      );
      const message = "Restauration supprimer  avec succès";
      Toastfunction.TaostSuccess(message);
    },
    [deleteRestauration.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer } = restaurationSlice;
export default reducer;
