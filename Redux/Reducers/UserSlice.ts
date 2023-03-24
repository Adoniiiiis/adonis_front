import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    ADD_USER: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { ADD_USER } = userSlice.actions;
export default userSlice.reducer;
