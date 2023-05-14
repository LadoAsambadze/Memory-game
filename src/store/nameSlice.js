import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
  name: "gridSize",
  initialState: {
    value: 8,
  },
  reducers: {
    setGridSize: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGridSize } = nameSlice.actions;

export default nameSlice.reducer;
