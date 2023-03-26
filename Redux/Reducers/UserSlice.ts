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
    LOGOUT_USER: (state) => {
      state.user = null;
    },
  },
});

export const { ADD_USER, LOGOUT_USER } = userSlice.actions;
export default userSlice.reducer;
