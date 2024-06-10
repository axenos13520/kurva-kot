import { configureStore } from "@reduxjs/toolkit";
import windowSlice from "./windowSlice";
import gameSlice from "./gameSlice";
import controlSlice from "./controlSlice";

export const store = configureStore({
  reducer: {
    window: windowSlice.reducer,
    game: gameSlice.reducer,
    control: controlSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
