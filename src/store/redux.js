import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import modeSlice from "./modeSlice";
import playerSlice from "./playerSlice";
import pairsSlice from "./pairsSlice";

const store = configureStore({
  reducer: {
    gridSize: nameReducer,
    mode: modeSlice,
    playerAmount: playerSlice,
    pairs: pairsSlice,
  },
});

export default store;
