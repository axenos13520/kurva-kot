import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  gamePaused: false,
};

const gameSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    pauseGame(state) {
      state.gamePaused = true;
    },
    resumeGame(state) {
      state.gamePaused = false;
    },
  },
});

export const { resumeGame, pauseGame } = gameSlice.actions;

export default gameSlice;
