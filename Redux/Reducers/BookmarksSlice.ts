import { createSlice } from '@reduxjs/toolkit';

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    bookmarks: null,
  },
  reducers: {
    ADD_BOOKMARKS: (state, { payload }) => {
      state.bookmarks = payload;
    },
  },
});

export const { ADD_BOOKMARKS } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
