import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Cart,
  CartAddLineItemAction,
  CartChangeLineItemQuantityAction,
  CartDraft,
  CartUpdate,
  CartUpdateAction,
  LineItem,
} from '@commercetools/platform-sdk';
import { createCart, getActiveCart, updateCart } from '../api/cart/cartMethods';
import { RootState } from './store';
// console.

export interface CartState {
  cart: Cart;
  isLoading: boolean;
  totalQuantity: number;
  cartItems: LineItem[];
}

const initialState: CartState = {
  cart: {} as Cart,
  isLoading: false,
  totalQuantity: 0,
  cartItems: [],
};

export const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
  try {
    const response = await getActiveCart();

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw new Error('Error from REDUX getActiveCart function');
  }
});

export const getCreateCart = createAsyncThunk(
  'cart/createCart',
  async (_, thunkAPI) => {
    try {
      const cartDraft: CartDraft = { currency: 'EUR' };
      const response = await createCart(cartDraft);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error creating cart');
    }
  }
);

export const getAddToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId: string, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;

      const addItemAction: CartAddLineItemAction = {
        action: 'addLineItem',
        productId,
        quantity: 1,
      };
      const { version, id } = state.cart.cart;
      const cartDraft: CartUpdate = { version, actions: [addItemAction] };

      const response = await updateCart(id, cartDraft);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error updating cart');
    }
  }
);

export const getChangeQuantity = createAsyncThunk(
  'cart/changeQuantity',
  async (
    { productId, quantity }: { productId: string; quantity: number },
    thunkAPI
  ) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;

      const addItemAction: CartChangeLineItemQuantityAction = {
        action: 'changeLineItemQuantity',
        lineItemId: productId,
        quantity,
      };
      const { version, id } = state.cart.cart;
      const cartDraft: CartUpdate = { version, actions: [addItemAction] };

      const response = await updateCart(id, cartDraft);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error updating cart');
    }
  }
);

export const getClearCart = createAsyncThunk(
  'cart/clearCart',
  async (actions: CartUpdateAction[], thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;

      const { version, id } = state.cart.cart;
      const cartDraft: CartUpdate = { version, actions };

      const response = await updateCart(id, cartDraft);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error cleaning cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /*     setCart: (state, action: PayloadAction<{ cart: Cart }>) => {
      const newState = state;
      newState.cart = action.payload.cart;
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
      })
      .addCase(getCart.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(getCreateCart.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getCreateCart.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
      })
      .addCase(getCreateCart.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(getAddToCart.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getAddToCart.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
        newState.totalQuantity = action.payload.lineItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
      })
      .addCase(getAddToCart.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(getChangeQuantity.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
        newState.totalQuantity = action.payload.lineItems.reduce(
          (acc, item) => acc - item.quantity,
          0
        );
      })
      .addCase(getClearCart.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
