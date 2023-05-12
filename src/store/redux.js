import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import modeSlice from "./modeSlice";

const store = configureStore({
  reducer: {
    gridSize: nameReducer,
    mode: modeSlice,
  },
});

export default store;
