import { createSlice } from '@reduxjs/toolkit';

export const contentDataSlice = createSlice({
  name: 'contentData',
  initialState: {
    contentData: null,
  },
  reducers: {
    ADD_CONTENTDATA: (state, { payload }) => {
      state.contentData = payload;
    },
  },
});

export const { ADD_CONTENTDATA } = contentDataSlice.actions;
export default contentDataSlice.reducer;
