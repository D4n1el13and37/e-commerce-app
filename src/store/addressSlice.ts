import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Address,
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { getCustomer, updateCustomer } from '../api/Customer/customer';
import { RootState } from './store';

export interface AddressState {
  version: number;
  addresses: Address[];
  defaultShippingAddressId: string | undefined;
  defaultBillingAddressId: string | undefined;
  shippingAddressIds: string[] | undefined;
  billingAddressIds: string[] | undefined;
  isLoading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  version: 0,
  addresses: [],
  defaultShippingAddressId: undefined,
  defaultBillingAddressId: undefined,
  shippingAddressIds: [],
  billingAddressIds: [],
  isLoading: false,
  error: null,
};

export const fetchAddresses = createAsyncThunk(
  'addresses/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getCustomer();
      const {
        version,
        addresses,
        defaultShippingAddressId,
        defaultBillingAddressId,
        shippingAddressIds,
        billingAddressIds,
      } = response;

      return {
        version,
        addresses,
        defaultShippingAddressId,
        defaultBillingAddressId,
        shippingAddressIds,
        billingAddressIds,
      };
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      throw new Error('Error fetching addresses');
    }
  }
);

export const updateAddress = createAsyncThunk<
  Customer,
  {
    customerId: string;
    data: { version: number; actions: CustomerUpdateAction[] };
  },
  { state: RootState }
>('addresses/update', async ({ customerId, data }, thunkAPI) => {
  try {
    const response = await updateCustomer(customerId, data);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw new Error('Error updating addresses');
  }
});

export const addNewAddress = createAsyncThunk<
  Customer,
  {
    customerId: string;
    data: { version: number; actions: CustomerUpdateAction[] };
  },
  { state: RootState }
>('addresses/add', async ({ customerId, data }, thunkAPI) => {
  try {
    const response = await updateCustomer(customerId, data);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw new Error('Error updating addresses');
  }
});

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      const newState = state;
      newState.version = action.payload.version;
      newState.addresses = action.payload.addresses;
      newState.defaultShippingAddressId =
        action.payload.defaultShippingAddressId;
      newState.defaultBillingAddressId = action.payload.defaultBillingAddressId;
      newState.shippingAddressIds = action.payload.shippingAddressIds;
      newState.billingAddressIds = action.payload.billingAddressIds;
    },
    setDefaultShippingAddress: (state, action) => {
      const newState = state;
      newState.defaultShippingAddressId = action.payload;
    },
    setDefaultBillingAddress: (state, action) => {
      const newState = state;
      newState.defaultBillingAddressId = action.payload;
    },

    setBillingAddressId: (state, action) => {
      const newState = state;
      newState.billingAddressIds = action.payload;
    },

    setShippingAddressId: (state, action) => {
      const newState = state;
      newState.billingAddressIds = action.payload;
    },
    setVersion: (state, action) => {
      const newState = state;
      newState.version = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.version = action.payload.version;

        newState.addresses = action.payload.addresses;
        newState.defaultShippingAddressId =
          action.payload.defaultShippingAddressId;
        newState.defaultBillingAddressId =
          action.payload.defaultBillingAddressId;
        newState.shippingAddressIds = action.payload.shippingAddressIds;
        newState.billingAddressIds = action.payload.billingAddressIds;
      })
      .addCase(fetchAddresses.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(updateAddress.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        const updatedCustomer = action.payload;
        newState.version = updatedCustomer.version;
        newState.addresses = updatedCustomer.addresses;
        newState.defaultShippingAddressId =
          updatedCustomer.defaultShippingAddressId;
        newState.defaultBillingAddressId =
          updatedCustomer.defaultBillingAddressId;
        newState.shippingAddressIds = updatedCustomer.shippingAddressIds;
        newState.billingAddressIds = updatedCustomer.billingAddressIds;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.error = action.payload as string;
      });
  },
});

export const {
  setAddresses,
  setDefaultShippingAddress,
  setDefaultBillingAddress,
  setShippingAddressId,
  setBillingAddressId,
  setVersion,
} = addressSlice.actions;
export default addressSlice.reducer;

export const selectAddresses = (state: RootState) => state.addresses.addresses;
export const selectDefaultShippingAddressId = (state: RootState) =>
  state.addresses.defaultShippingAddressId;
export const selectDefaultBillingAddressId = (state: RootState) =>
  state.addresses.defaultBillingAddressId;
export const selectBillingAddressId = (state: RootState) =>
  state.addresses.billingAddressIds;
export const selectShippingAddressId = (state: RootState) =>
  state.addresses.shippingAddressIds;
export const selectVersion = (state: RootState) => state.addresses.version;
export const selectIsLoading = (state: RootState) => state.addresses.isLoading;
export const selectError = (state: RootState) => state.addresses.error;
