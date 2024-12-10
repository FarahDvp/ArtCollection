import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import ImagesService from "../services/imageService";
import Toastfunction from "../utils/ToastFunction";

export const getAllImagesByOeuvre = createAsyncThunk(
  "Images/getAllImagesByOeuvre",
  async (_id, thunkAPI) => {
    try {
      const response = await ImagesService.getAllByIdOeuvre(_id);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteImages = createAsyncThunk(
  "user/deleteImages",
  async (_id, thunkAPI) => {
    try {
      const response = await ImagesService.deleteOne(_id);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addImages = createAsyncThunk(
  "Images/addImages",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(_id);
      const response = await ImagesService.add(_id, info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editImages = createAsyncThunk(
  "Images/editImages",
  async ({ _id, info }, thunkAPI) => {
    try {
      console.log(info);

      const response = await ImagesService.edit(_id, info);
      console.log(response.data);
      return { _id, info };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const imagesSlice = createSlice({
  name: "Images",
  initialState: {
    ImagesList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addImages.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
      state.loading = false;
    },
    [addImages.pending]: (state) => {
      state.loading = true;
      state.succes = false;
    },
    [addImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      console.log(action.payload.data);
      state.ImagesList.push(action.payload.data);
    },
    [getAllImagesByOeuvre.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllImagesByOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.ImagesList = action.payload.data;
    },
    [getAllImagesByOeuvre.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteImages.pending]: (state) => {
      state.succes = false;
    },
    [deleteImages.fulfilled]: (state, action) => {
      state.ImagesList = state.ImagesList.filter(
        (item) => item._id !== action.payload
      );
      const message = "Images supprimer  avec succès";
      Toastfunction.TaostSuccess(message);
    },
    [deleteImages.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer } = imagesSlice;
export default reducer;
