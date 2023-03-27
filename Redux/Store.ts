import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice';
import contentDataReducer from './Reducers/ContentDataSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    contentData: contentDataReducer,
  },
});
