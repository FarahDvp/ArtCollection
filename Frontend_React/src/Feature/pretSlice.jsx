import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import PretService from "../services/pretService";
import Toastfunction from "../utils/ToastFunction";

export const getAllPretByOeuvre = createAsyncThunk(
  "Pret/getAllPretByOeuvre",
  async (_id, thunkAPI) => {
    try {
      const response = await PretService.getAllByIdOeuvre(_id);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePret = createAsyncThunk(
  "user/deletePret",
  async (_id, thunkAPI) => {
    try {
      const response = await PretService.deleteOne(_id);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addPret = createAsyncThunk(
  "Pret/addPret",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(_id);
      const response = await PretService.add(_id, info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editPret = createAsyncThunk(
  "Pret/editPret",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(info);

      const response = await PretService.edit(_id, info);
      console.log(response.data);
      return { _id, info };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const pretSlice = createSlice({
  name: "Pret",
  initialState: {
    PretList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addPret.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
      state.loading = false;
    },
    [addPret.pending]: (state) => {
      state.loading = true;
      state.succes = false;
    },
    [addPret.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      console.log(action.payload.data);
      state.PretList.push(action.payload.data);
    },
    [getAllPretByOeuvre.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPretByOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.PretList = action.payload.data;
    },
    [getAllPretByOeuvre.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deletePret.pending]: (state) => {
      state.succes = false;
    },
    [deletePret.fulfilled]: (state, action) => {
      state.PretList = state.PretList.filter(
        (item) => item._id !== action.payload
      );
      const message = "Pret supprimer  avec succès";
      Toastfunction.TaostSuccess(message);
    },
    [deletePret.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer } = pretSlice;
export default reducer;
