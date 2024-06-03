import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsSlice from './productsSlice';
import customerSlice from './customerSlice';
import filterSlice from './filterSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsSlice,
    customer: customerSlice,
    filters: filterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
