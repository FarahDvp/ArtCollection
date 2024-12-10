import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import materielService from "../services/materielService";

export const getAllMateriel = createAsyncThunk(
  "user/getAllMateriel",
  async () => {
    const response = await materielService.getAll();
    console.log(response.data);

    return response.data.data;
  }
);

export const deleteMateriel = createAsyncThunk(
  "user/deleteMateriel",
  async (_id, thunkAPI) => {
    try {
      const response = await materielService.deleteOne(_id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addMateriel = createAsyncThunk(
  "materiel/addMateriel",
  async (info, thunkAPI) => {
    try {
      const response = await materielService.addMateriel(info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const MaterielSlice = createSlice({
  name: "materiel",
  initialState: {
    materielList: [],
    loading: false,
    succes: false,
    error: "",
  },
  extraReducers: {
    [addMateriel.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [addMateriel.pending]: (state) => {
      state.succes = false;
    },
    [addMateriel.fulfilled]: (state, action) => {
      state.succes = true;
      state.materielList.push(action.payload.data);
    },
    [getAllMateriel.pending]: (state, action) => {
      state.loading = true;
      state.succes = false;
    },
    [getAllMateriel.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      state.materielList = action.payload;
    },
    [getAllMateriel.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [deleteMateriel.pending]: (state) => {
      state.succes = false;
    },
    [deleteMateriel.fulfilled]: (state, action) => {
      state.succes = true;
      state.materielList = state.materielList.filter(
        (item) => item._id === action.payload
      );
    },
    [deleteMateriel.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
  },
});

const { reducer } = MaterielSlice;
export default reducer;
