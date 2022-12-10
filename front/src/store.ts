import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./reducers/personSlice";

export const store = configureStore({
    reducer: { 
        personReducer 
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch