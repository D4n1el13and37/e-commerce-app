import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Cart,
  CartAddDiscountCodeAction,
  CartAddLineItemAction,
  CartChangeLineItemQuantityAction,
  CartDraft,
  // CartDraft,
  CartRemoveDiscountCodeAction,
  // CartDraft,
  CartUpdate,
  DiscountCode,
  DiscountCodeReference,
  LineItem,
} from '@commercetools/platform-sdk';
import {
  createAnonymCart,
  // createCart,
  // createCart2,
  // getACartInStore,
  getActiveCart,
  getDiscountCodes,
  getAnonymCartInStore,
  updateCart,
  createCart,
} from '../api/cart/cartMethods';
import { RootState } from './store';

export interface CartState {
  cart: Cart;
  isLoading: boolean;
  totalQuantity: number;
  cartItems: LineItem[];
  discountsList: DiscountCode[];
}

const initialState: CartState = {
  cart: {} as Cart,
  isLoading: false,
  totalQuantity: 0,
  cartItems: [],
  discountsList: [],
};

export const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
  try {
    const response = await getActiveCart();

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
    throw new Error('Error from REDUX getActiveCart function');
  }
});

export const getAnonymCart = createAsyncThunk(
  'cart/getAnonymCart',
  async (_, thunkAPI) => {
    try {
      const id = localStorage.getItem('cart-id') || '';
      let response;
      if (id) {
        response = await getAnonymCartInStore(id);
      } else {
        response = await createAnonymCart({ currency: 'EUR' });
        localStorage.setItem('cart-id', response.id);
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error from REDUX getActiveCart function');
    }
  }
);

export const getCreateCart = createAsyncThunk(
  'cart/createCart',
  async (_, thunkAPI) => {
    try {
      const cartDraft: CartDraft = { currency: 'EUR' };
      const response = await createCart(cartDraft);
      localStorage.setItem('cart-id', response.id);
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

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;
      const { version, id, lineItems } = state.cart.cart;

      const actions: CartChangeLineItemQuantityAction[] = lineItems.map(
        (item) => ({
          action: 'changeLineItemQuantity',
          lineItemId: item.id,
          quantity: 0,
        })
      );

      const cartDraft: CartUpdate = { version, actions };
      const response = await updateCart(id, cartDraft);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error clearing cart');
    }
  }
);

export const getDiscounts = createAsyncThunk(
  'cart/getDiscounts',
  async (_, thunkAPI) => {
    try {
      const response = await getDiscountCodes();
      return response.results;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error updating cart');
    }
  }
);

export const applyDiscount = createAsyncThunk(
  'cart/applyDiscount',
  async (code: string, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;
      const addDiscount: CartAddDiscountCodeAction[] = [
        {
          action: 'addDiscountCode',
          code,
        },
      ];
      const { version, id } = state.cart.cart;
      const cartDraft: CartUpdate = { version, actions: addDiscount };
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

export const deleteDiscounts = createAsyncThunk(
  'cart/removeDiscounts',
  async (_, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;
      const action: CartRemoveDiscountCodeAction[] =
        state.cart.cart.discountCodes.map(({ discountCode }) => ({
          action: 'removeDiscountCode',
          discountCode,
        }));

      const { version, id } = state.cart.cart;
      const cartDraft: CartUpdate = { version, actions: action };

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

export const deleteDiscount = createAsyncThunk(
  'cart/removeDiscount',
  async (discountCode: DiscountCodeReference, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;

      const action: CartRemoveDiscountCodeAction = {
        action: 'removeDiscountCode',
        discountCode,
      };

      const { version, id } = state.cart.cart;
      const cartDraft: CartUpdate = { version, actions: [action] };

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
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
      .addCase(getAnonymCart.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getAnonymCart.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
      })
      .addCase(getAnonymCart.rejected, (state) => {
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
      .addCase(clearCart.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
      })
      .addCase(clearCart.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(applyDiscount.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(applyDiscount.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
      })
      .addCase(applyDiscount.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(getDiscounts.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.discountsList = action.payload;
      })
      .addCase(getDiscounts.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(deleteDiscount.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
        newState.cartItems = action.payload.lineItems;
      })
      .addCase(deleteDiscount.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(deleteDiscounts.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(deleteDiscounts.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
      })
      .addCase(deleteDiscounts.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      });
  },
});

export default cartSlice.reducer;
