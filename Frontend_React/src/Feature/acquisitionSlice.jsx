import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import AcquisitionService from "../services/acquisitionService";
import Toastfunction from "../utils/ToastFunction";

export const getAllAcquisitionByOeuvre = createAsyncThunk(
  "Acquisition/getAllAcquisitionByOeuvre",
  async (_id, thunkAPI) => {
    try {
      const response = await AcquisitionService.getAllByIdOeuvre(_id);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteAcquisition = createAsyncThunk(
  "user/deleteAcquisition",
  async (_id, thunkAPI) => {
    try {
      const response = await AcquisitionService.deleteOne(_id);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addAcquisition = createAsyncThunk(
  "Acquisition/addAcquisition",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(_id);
      const response = await AcquisitionService.add(_id, info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editAcquisition = createAsyncThunk(
  "Acquisition/editAcquisition",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(info);

      const response = await AcquisitionService.edit(_id, info);
      console.log(response.data);
      return { _id, info };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const acquisitionSlice = createSlice({
  name: "Acquisition",
  initialState: {
    AcquisitionList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addAcquisition.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
      state.loading = false;
    },
    [addAcquisition.pending]: (state) => {
      state.loading = true;
      state.succes = false;
    },
    [addAcquisition.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      console.log(action.payload.data);
      state.AcquisitionList.push(action.payload.data);
    },
    [getAllAcquisitionByOeuvre.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllAcquisitionByOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.AcquisitionList = action.payload.data;
    },
    [getAllAcquisitionByOeuvre.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteAcquisition.pending]: (state) => {
      state.succes = false;
    },
    [deleteAcquisition.fulfilled]: (state, action) => {
      state.AcquisitionList = state.AcquisitionList.filter(
        (item) => item._id !== action.payload
      );
      const message = "Acquisition supprimer  avec succès";
      Toastfunction.TaostSuccess(message);
    },
    [deleteAcquisition.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer } = acquisitionSlice;
export default reducer;
