import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IControlState {
  onKeyDownFunctions: Function[];
}

const initialState: IControlState = {
  onKeyDownFunctions: [],
};

const controlSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    onKeyDownSubscribe(state, payload: PayloadAction<Function>) {
      state.onKeyDownFunctions = [...state.onKeyDownFunctions, payload.payload];
    },
  },
});

export const { onKeyDownSubscribe } = controlSlice.actions;

export default controlSlice;
