import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  showEdit: false,
  showImage: false,
  showBibliographie: false,
  showPret: false,
  showReserve: false,
  showAcquisition: false,
  showInfoGeneral: false,

  artist: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.show = false;
      state.showEdit = false;
      state.showImage = false;
      state.showReserve = false;
      state.showPret = false;
      state.showBibliographie = false;
      state.showAcquisition = false;
      state.showInfoGeneral = false;
    },
    handleShow: (state, action) => {
      if (action.payload) {
        state.artist = action.payload;
        state.showEdit = true;
      } else {
        state.show = true;
      }
    },
    handleShowImage: (state, action) => {
      state.showImage = true;
    },
    handleShowPret: (state, action) => {
      state.showPret = true;
    },
    handleShowBibliographie: (state, action) => {
      state.showBibliographie = true;
    },
    handleShowReserve: (state, action) => {
      state.showReserve = true;
    },
    handleShowAcquisition: (state, action) => {
      state.showAcquisition = true;
    },
    handleShowInfoGeneral: (state, action) => {
      state.showInfoGeneral = true;
    },
  },
});

export const {
  handleClose,
  handleShow,
  handleShowImage,
  handleShowEdit,
  handleShowBibliographie,
  handleShowReserve,
  handleShowPret,
  handleShowAcquisition,
  handleShowInfoGeneral,
} = modalSlice.actions;
export default modalSlice.reducer;
