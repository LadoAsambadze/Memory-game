import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
  name: "gridSize",
  initialState: {
    Boolean: true,
  },
  reducers: {
    setGridSize: (state, action) => {
      state.Boolean = action.payload;
    },
  },
});



export const { setGridSize } = nameSlice.actions;

export default nameSlice.reducer;
