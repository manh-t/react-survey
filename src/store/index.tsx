import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './reducers/Authentication';
import { surveysSlice } from './reducers/Surveys';
import { userSlice } from './reducers/User';

export const reducers = {
  auth: authSlice.reducer,
  surveys: surveysSlice.reducer,
  user: userSlice.reducer,
};

export const store = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
