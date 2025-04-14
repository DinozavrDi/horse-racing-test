import { configureStore } from "@reduxjs/toolkit";
import winnerSlice from "./slices/winners-slice";

export const store = configureStore({
  reducer: {
    winners: winnerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
