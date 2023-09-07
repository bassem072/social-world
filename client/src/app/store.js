import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    message: messageReducer,
  },
  devTools: true,
});
