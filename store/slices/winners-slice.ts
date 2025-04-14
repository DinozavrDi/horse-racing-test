import { Horse } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const winnersSlice = createSlice({
  name: "winners",
  initialState: {
    data: [],
  },
  reducers: {
    addWinner: (state: { data: Horse[] }, action: PayloadAction<Horse>) => {
      state.data.push(action.payload);
    },
  },
});

export default winnersSlice.reducer;

export const { addWinner } = winnersSlice.actions;
