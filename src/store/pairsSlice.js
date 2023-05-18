import { createSlice } from "@reduxjs/toolkit";

const pairsSlice = createSlice({
  name: "pairs",
  initialState: { array: [] },
  reducers: {
    setPairs: (state, action) => {
      state.array = action.payload;
    },
  },
});

export const { setPairs } = pairsSlice.actions;
export default pairsSlice.reducer;
