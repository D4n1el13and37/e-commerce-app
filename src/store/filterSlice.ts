import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterValue } from '../api/products/productsMethods';

interface FilterState {
  filters: FilterValue;
}

const initialState: FilterState = {
  filters: {
    size: [],
    careLevel: [],
    lightRequirement: [],
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterValue>) {
      const newState = state;
      newState.filters = action.payload;
    },
    resetFilters(state) {
      const newState = state;
      newState.filters = initialState.filters;
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
