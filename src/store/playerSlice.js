import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    value: "1",
  },
  reducers: {
    setPlayerAmount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPlayerAmount } = playerSlice.actions;
export default playerSlice.reducer;
