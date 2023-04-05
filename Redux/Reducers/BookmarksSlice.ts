import { contentType } from '@/Types/ContentType';
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
    EDIT_BOOKMARK: (state: any, { payload }) => {
      state.bookmarks = state.bookmarks.map((content: any) => {
        if (content.id === payload) {
          if (content.isBookmarked === true) {
            return {
              ...content,
              isBookmarked: false,
            };
          } else {
            return {
              ...content,
              isBookmarked: true,
            };
          }
        } else {
          return content;
        }
      });
    },
  },
});

export const { ADD_BOOKMARKS, EDIT_BOOKMARK } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
