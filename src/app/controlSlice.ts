import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IControlState {
  onKeyDownFunctions: Function[];
  onClickFunctions: Function[];
}

const initialState: IControlState = {
  onKeyDownFunctions: [],
  onClickFunctions: [],
};

const controlSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    onKeyDownSubscribe(state, payload: PayloadAction<Function>) {
      state.onKeyDownFunctions = [...state.onKeyDownFunctions, payload.payload];
    },
    onClickSubscrive(state, payload: PayloadAction<Function>) {
      state.onClickFunctions = [...state.onClickFunctions, payload.payload];
    },
  },
});

export const { onKeyDownSubscribe } = controlSlice.actions;

export default controlSlice;
