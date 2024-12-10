import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import oeuvreService from "../services/oeuvreService";

export const addOeuvre = createAsyncThunk(
  "oeuvre/addOeuvre",
  async (info, thunkAPI) => {
    try {
      const response = await oeuvreService.addOeuvre(info);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllOeuvre = createAsyncThunk(
  "oeuvre/getAllOeuvre",
  async () => {
    try {
      const response = await oeuvreService.getAll();
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const getOneOeuvre = createAsyncThunk(
  "oeuvre/getOneOeuvre",
  async (_id) => {
    try {
      const response = await oeuvreService.getOne(_id);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const editOeuvre = createAsyncThunk(
  "oeuvre/editOeuvre",
  async ({ id, info }, thunkAPI) => {
    try {
      const response = await oeuvreService.edit(id, info);
      return { id, info };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const oeuvreSlice = createSlice({
  name: "oeuvre",
  initialState: {
    info: {
      titre: "",
      categorie: "",
      etat: "",
      artiste: "",
      description: "",
      poid: 0,
      dateDeCreation: "",
      typeTirage: "",
      numeroTirage: 0,
      support: "",
      hauteur: 0,
      profondeur: 0,
      largeur: 0,
      nbElement: 0,
      // acquisition
      proprietaireActuel: "",
      lieuAcquisition: "",
      dateAcquisition: "",
      prixAcquisition: 0,
      moyenAcquisition: "",
      preuveAchat: null,
      certificat: null,
      // Localisation de conservation
      placeDansLeDepot: "",
      modeDeStockage: "",
      materiel: [],
      // image
      url: null,
      copyright: "",
      droit: "",
      dateSortie: "",
      autreInformation: "",
      // signature
      localisationSurOeuvre: "",
      descriptionSignature: "",
    },
    succes: false,
    error: false,
    loading: false,
    oeuvreList: [],
    oeuvreInfo: [],
  },
  reducers: {
    handleChange(state, action) {
      const { field, value } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        info: {
          ...state.info,
          [field]: value,
        },
      };
    },
  },
  extraReducers: {
    [addOeuvre.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [addOeuvre.pending]: (state) => {
      state.succes = false;
    },
    [addOeuvre.fulfilled]: (state, action) => {
      state.succes = true;
    },
    [getAllOeuvre.pending]: (state, action) => {
      state.loading = true;
      state.succes = false;
    },
    [getAllOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      state.oeuvreList = action.payload.data;
    },
    [getAllOeuvre.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [getOneOeuvre.pending]: (state, action) => {
      state.loading = true;
      state.succes = false;
    },
    [getOneOeuvre.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = true;
      state.oeuvreInfo = action.payload.data;
    },
    [getOneOeuvre.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [editOeuvre.rejected]: (state, action) => {
      state.succes = false;
      state.error = action.payload;
    },
    [editOeuvre.pending]: (state) => {
      state.succes = false;
    },
    [editOeuvre.fulfilled]: (state, action) => {
      state.succes = true;
    },
  },
});

const { reducer } = oeuvreSlice;
export const { handleChange, handleChangeImage } = oeuvreSlice.actions;

export default reducer;
