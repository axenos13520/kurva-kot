import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const initialState = {
  windowSize: [500, 300],
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setWindowSize(state, payload: PayloadAction<number[]>) {
      state.windowSize = payload.payload;
    },
  },
});

export const { setWindowSize } = windowSlice.actions;

export default windowSlice;
