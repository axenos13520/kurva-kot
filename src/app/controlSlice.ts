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
    onClickSubscribe(state, payload: PayloadAction<Function>) {
      state.onClickFunctions = [...state.onClickFunctions, payload.payload];
    },
  },
});

export const { onKeyDownSubscribe, onClickSubscribe } = controlSlice.actions;

export default controlSlice;
