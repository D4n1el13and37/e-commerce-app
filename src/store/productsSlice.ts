import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Category,
  Image,
  LocalizedString,
  ProductProjection,
} from '@commercetools/platform-sdk';
import {
  getCardsByCategory,
  getCategories,
  getProducts,
  getProduct,
  getCardsByFilters,
  FilterValue,
  getCardsBySorting,
  SortingValue,
} from '../api/products/productsMethods';

export interface CustomProduct {
  title: LocalizedString;
  description: LocalizedString;
  price: number;
  salePrice: number;
  images: Image[] | undefined;
  id?: string;
}

export interface ProductState {
  productsList: CustomProduct[];
  categoriesList: Category[];
  productByID: ProductProjection | null;
  language: 'en-US' | 'ru-RU';
  isLoading: boolean;
}

const initialState: ProductState = {
  productsList: [],
  categoriesList: [],
  productByID: null,
  language: 'en-US',
  isLoading: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getProducts();
      const answer: CustomProduct[] = [];
      response.results.forEach((card) => {
        const data = {
          title: card.masterData.current.name,
          description: card.masterData.current.description!,
          price:
            card.masterData.current.masterVariant.prices![0].value.centAmount,
          salePrice:
            card.masterData.current.masterVariant.prices![0].discounted!.value
              .centAmount,
          id: card.id,
          images: card.masterData.current.masterVariant.images,
        };
        answer.push(data);
      });
      return answer;
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

export const fetchCategories = createAsyncThunk(
  'products/categories',
  async (_, thunkAPI) => {
    try {
      const response = await getCategories();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error fetching categories');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/productsByCategory',
  async (categoryId: string, thunkAPI) => {
    try {
      const response = await getCardsByCategory(categoryId);
      const answer: CustomProduct[] = [];
      response.results.forEach((card) => {
        const data = {
          title: card.name,
          description: card.description!,
          price: card.masterVariant.prices![0].value.centAmount,
          salePrice: card.masterVariant.prices![0].discounted!.value.centAmount,
          id: card.id,
          images: card.masterVariant.images,
        };
        answer.push(data);
      });
      return answer;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error fetching products by category');
    }
  }
);

export const fetchProductsByFilters = createAsyncThunk(
  'products/productsByFilters',
  async (filters: FilterValue, thunkAPI) => {
    try {
      const response = await getCardsByFilters(filters);
      const answer: CustomProduct[] = [];
      response.results.forEach((card) => {
        const data = {
          title: card.name,
          description: card.description!,
          price: card.masterVariant.prices![0].value.centAmount,
          salePrice: card.masterVariant.prices![0].discounted!.value.centAmount,
          id: card.id,
          images: card.masterVariant.images,
        };
        answer.push(data);
      });
      return answer;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error fetching products by category');
    }
  }
);

export const fetchProductsBySorting = createAsyncThunk(
  'products/productsBySort',
  async (sorting: SortingValue, thunkAPI) => {
    try {
      const response = await getCardsBySorting(sorting);
      const answer: CustomProduct[] = [];
      response.results.forEach((card) => {
        const data = {
          title: card.name,
          description: card.description!,
          price: card.masterVariant.prices![0].value.centAmount,
          salePrice: card.masterVariant.prices![0].discounted!.value.centAmount,
          id: card.id,
          images: card.masterVariant.images,
        };
        answer.push(data);
      });
      return answer;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error fetching products by category');
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
        newState.productsList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.categoriesList = action.payload.results;
      })
      .addCase(fetchCategories.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.productsList = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(fetchProductsByFilters.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.productsList = action.payload;
      })
      .addCase(fetchProductsByFilters.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(fetchProductsBySorting.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(fetchProductsBySorting.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.productsList = action.payload;
      })
      .addCase(fetchProductsBySorting.rejected, (state) => {
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
