import { Customer } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

interface CustomerState {
  dataUser: Customer | null;
}

const initialState: CustomerState = {
  dataUser: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setDataUser: (state, action) => {
      const newState = state;
      newState.dataUser = action.payload;
    },
  },
});

export const { setDataUser } = customerSlice.actions;
export default customerSlice.reducer;
