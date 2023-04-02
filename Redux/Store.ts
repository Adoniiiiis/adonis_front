import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice';
import bookmarksReducer from './Reducers/BookmarksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    bookmarks: bookmarksReducer,
  },
});
