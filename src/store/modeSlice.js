import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: {
    Boolean: "true",
  },
  reducers: {
    setMode: (state, action) => {
      state.Boolean = action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;
