import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { getProducts, getProduct } from '../api/products/productsMethods';

export interface ProductState {
  productsList: Product[];
  productByID: ProductProjection | null;
  language: 'en-US' | 'ru-RU';
  isLoading: boolean;
}

const initialState: ProductState = {
  productsList: [],
  productByID: null,
  language: 'en-US',
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
      throw new Error('Error from REDUX getProducts function');
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchByID',
  async (productId: string, thunkAPI) => {
    try {
      const response = await getProduct(productId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error from REDUX getProduct function');
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
      })
      .addCase(fetchProduct.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.productByID = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      });
  },
});

export default productsSlice.reducer;
