import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import modalSlice from "../Feature/modalSlice";
import userSlice from "../Feature/userSlice";
import authSlice from "../Feature/authSlice";
import oeuvreSlice from "../Feature/oeuvreSlice";
import materielSlice from "../Feature/materielSlice";
import categorieSlice from "../Feature/categorieSlice";
import artisteSlice from "../Feature/artisteSlice";
import restaurationSlice from "../Feature/restaurationSlice";
import imageSlice from "../Feature/imagesSlice";
import pretSlice from "../Feature/pretSlice";
import bibliographieSlice from "../Feature/bibliographieSlice";
import reserveSlice from "../Feature/reserveSlice";
import acquisitionSlice from "../Feature/acquisitionSlice";

const reducers = combineReducers({
  modal: modalSlice,
  user: userSlice,
  auth: authSlice,
  oeuvre: oeuvreSlice,
  materiel: materielSlice,
  categorie: categorieSlice,
  artiste: artisteSlice,
  restauration: restaurationSlice,
  image: imageSlice,
  pret: pretSlice,
  bibliographie: bibliographieSlice,
  reserve: reserveSlice,
  acquisition: acquisitionSlice,
});
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // hetha barka bich yet7at fi local storage
};

const persistor = persistReducer(rootPersistConfig, reducers);

export default configureStore({
  reducer: persistor,
  middleware: [thunk],
});
