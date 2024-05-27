import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '@commercetools/platform-sdk';
import { getProducts } from '../api/products/productsMethods';

export interface ProductState {
  productsList: Product[];
  isLoading: boolean;
}

const initialState: ProductState = {
  productsList: [],
  isLoading: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getProducts();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message); // ???
      }
      throw new Error('Error from REDUX login function');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.productsList = action.payload.results;
      })
      .addCase(fetchProducts.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      });
  },
});

export default productsSlice.reducer;
