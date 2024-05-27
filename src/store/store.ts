import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsSlice from './productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
