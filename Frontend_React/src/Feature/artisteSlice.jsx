import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import artisteService from "../services/artisteService";
import Toastfunction from "../utils/ToastFunction";

export const getAllArtiste = createAsyncThunk(
  "ariste/getAllArtiste",
  async () => {
    const response = await artisteService.getAll();
    console.log(response.data);

    return response.data;
  }
);
export const getOneArtiste = createAsyncThunk(
  "ariste/getOneArtiste",
  async (_id, thunkAPI) => {
    try {
      const response = await artisteService.getOne(_id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteArtiste = createAsyncThunk(
  "ariste/deleteArtiste",
  async (_id, thunkAPI) => {
    try {
      const response = await artisteService.deleteOne(_id);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addArtist = createAsyncThunk(
  "ariste/addArtist",
  async (info, thunkAPI) => {
    try {
      console.log(info);
      const response = await artisteService.addArtiste(info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editArtist = createAsyncThunk(
  "ariste/editArtist",
  async ({ id, info, artistIn }, thunkAPI) => {
    try {

      const response = await artisteService.edit(id, info);
      return { id, info, artistIn };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const artisteSlice = createSlice({
  name: "ariste",
  initialState: {
    artisteList: [],
    loading: false,
    succes: false,
    error: "",
    artisteInfo: [],
  },
  extraReducers: {
    [addArtist.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [addArtist.pending]: (state) => {
      state.succes = false;
    },
    [addArtist.fulfilled]: (state, action) => {
      state.succes = true;
      state.artisteList.push(action.payload.data);
    },
    [editArtist.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [editArtist.pending]: (state) => {
      state.succes = false;
    },
    [editArtist.fulfilled]: (state, action) => {
      state.succes = true;
      const { id, artistIn } = action.payload;
      const index = state.artisteList.findIndex((artist) => artist._id === id);
      if (index !== -1) {
        state.artisteList[index] = { ...state.artisteList[index], ...artistIn };
      }
    },
    [getAllArtiste.pending]: (state, action) => {
      state.loading = true;
      state.succes = false;
    },
    [getAllArtiste.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      state.artisteList = action.payload.data;
    },
    [getAllArtiste.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [getOneArtiste.pending]: (state, action) => {
      state.loading = true;
      state.succes = false;
    },
    [getOneArtiste.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      state.artisteInfo = action.payload.data;
    },
    [getOneArtiste.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [deleteArtiste.pending]: (state) => {
      state.succes = false;
    },
    [deleteArtiste.fulfilled]: (state, action) => {
      state.succes = true;
      state.artisteList = state.artisteList.filter(
        (item) => item._id !== action.payload
      );
      const message = "Artiste supprimer  avec succès";
      Toastfunction.TaostSuccess(message);
    },
    [deleteArtiste.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
  },
});

const { reducer } = artisteSlice;
export default reducer;
