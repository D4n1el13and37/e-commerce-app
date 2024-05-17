import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const key = 'tokendata';
const storedData = localStorage.getItem(key);
const { token } = storedData ? JSON.parse(storedData) : { token: null };

const initialState = {
  token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<{ token: string }>) => {
      const newState = {
        token: action.payload.token,
        isAuthenticated: true,
      };
      return newState;
    },
    logout: () => {
      localStorage.removeItem(key);
      return {
        token: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
