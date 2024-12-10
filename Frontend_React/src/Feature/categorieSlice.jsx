import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import CategorieService from "../services/categorieService";

export const getAllCategorie = createAsyncThunk(
  "user/getAllCategorie",
  async () => {
    const response = await CategorieService.getAll();
    console.log(response.data.data);

    return response.data;
  }
);

export const deleteCategorie = createAsyncThunk(
  "user/deleteCategorie",
  async (_id, thunkAPI) => {
    try {
      const response = await CategorieService.deleteOne(_id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addCategorie = createAsyncThunk(
  "Categorie/addCategorie",
  async (info, thunkAPI) => {
    try {
      const response = await CategorieService.addCategorie(info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const CategorieSlice = createSlice({
  name: "Categorie",
  initialState: {
    CategorieList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addCategorie.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [addCategorie.pending]: (state) => {
      state.succes = false;
    },
    [addCategorie.fulfilled]: (state, action) => {
      state.succes = true;
      state.CategorieList.push(action.payload.data);
    },
    [getAllCategorie.pending]: (state, action) => {
      state.loading = true;
      state.succes = false;
    },
    [getAllCategorie.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      state.CategorieList = action.payload.data;
    },
    [getAllCategorie.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [deleteCategorie.pending]: (state) => {
      state.succes = false;
    },
    [deleteCategorie.fulfilled]: (state, action) => {
      state.succes = true;
      state.CategorieList = state.CategorieList.filter(
        (item) => item._id === action.payload
      );
    },
    [deleteCategorie.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
  },
});

const { reducer } = CategorieSlice;
export default reducer;
