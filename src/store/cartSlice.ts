import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Cart,
  CartAddDiscountCodeAction,
  CartAddLineItemAction,
  CartChangeLineItemQuantityAction,
  CartDraft,
  CartRemoveDiscountCodeAction,
  CartUpdate,
  // CartUpdateAction,
  DiscountCode,
  // CartUpdateAction,
  LineItem,
} from '@commercetools/platform-sdk';
import {
  createCart,
  deleteCart,
  getActiveCart,
  getDiscountCodes,
  updateCart,
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
    { productId, quanity }: { productId: string; quanity: number },
    thunkAPI
  ) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;

      const addItemAction: CartChangeLineItemQuantityAction = {
        action: 'changeLineItemQuantity',
        lineItemId: productId,
        quantity: quanity,
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

export const removeCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;
      const { version, id } = state.cart.cart;
      const response = await deleteCart(id, version);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error cleaning cart');
    }
  }
);

// export const getDi
export const getDiscounts = createAsyncThunk(
  'cart/getDiscounts',
  async (_, thunkAPI) => {
    try {
      const response = await getDiscountCodes();

      // console.log(response.results);
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

      // console.log(response.discountCodes);

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
  'cart/removeDiscount',
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
      .addCase(removeCart.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.cart = action.payload;
      })
      .addCase(removeCart.rejected, (state) => {
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
