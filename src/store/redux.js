import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import modeSlice from "./modeSlice";
import playerSlice from "./playerSlice";

const store = configureStore({
  reducer: {
    gridSize: nameReducer,
    mode: modeSlice,
    playerAmount: playerSlice,
  },
});

export default store;
