import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import BibliographieService from "../services/bibliographieService";
import Toastfunction from "../utils/ToastFunction";

export const getAllBibliographieByOeuvre = createAsyncThunk(
  "Bibliographie/getAllBibliographieByOeuvre",
  async (_id, thunkAPI) => {
    try {
      const response = await BibliographieService.getAllByIdOeuvre(_id);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteBibliographie = createAsyncThunk(
  "user/deleteBibliographie",
  async (_id, thunkAPI) => {
    try {
      const response = await BibliographieService.deleteOne(_id);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addBibliographie = createAsyncThunk(
  "Bibliographie/addBibliographie",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(_id);
      const response = await BibliographieService.add(_id, info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editBibliographie = createAsyncThunk(
  "Bibliographie/editBibliographie",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(info);

      const response = await BibliographieService.edit(_id, info);
      console.log(response.data);
      return { _id, info };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const bibliographieSlice = createSlice({
  name: "Bibliographie",
  initialState: {
    BibliographieList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addBibliographie.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
      state.loading = false;
    },
    [addBibliographie.pending]: (state) => {
      state.loading = true;
      state.succes = false;
    },
    [addBibliographie.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      console.log(action.payload.data);
      state.BibliographieList.push(action.payload.data);
    },
    [getAllBibliographieByOeuvre.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllBibliographieByOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.BibliographieList = action.payload.data;
    },
    [getAllBibliographieByOeuvre.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteBibliographie.pending]: (state) => {
      state.succes = false;
    },
    [deleteBibliographie.fulfilled]: (state, action) => {
      state.BibliographieList = state.BibliographieList.filter(
        (item) => item._id !== action.payload
      );
      const message = "Bibliographie supprimer  avec succès";
      Toastfunction.TaostSuccess(message);
    },
    [deleteBibliographie.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer } = bibliographieSlice;
export default reducer;
