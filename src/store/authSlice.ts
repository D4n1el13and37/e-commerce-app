import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk';
import { loginByToken, loginWithPassword } from '../api/authMethods';
import { LoginForm } from '../pages/Login/LoginPage';

// const key = 'tokendata';
// const storedData = localStorage.getItem(key);
// const { token } = storedData ? JSON.parse(storedData) : { token: null };

export interface AutorizationState {
  currentUser: null | Customer;
  isAutorized: boolean;
  isLoading: boolean;
}

const initialState: AutorizationState = {
  currentUser: null,
  isAutorized: false,
  isLoading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (userData: LoginForm, thunkAPI) => {
    try {
      const { email, password } = userData;
      const response = await loginWithPassword(email, password);
      // console.warn(response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message); // ???
      }
      throw new Error('Error from REDUX login function');
    }
  }
);

export const autorizationByToken = createAsyncThunk(
  'auth/loginByToken',
  async (_, thunkAPI) => {
    try {
      const response = await loginByToken();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message); // ???
      }
      throw new Error('Error from REDUX login function');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('tokendata');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.isAutorized = true;
        newState.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(autorizationByToken.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(autorizationByToken.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.isAutorized = true; // do we actually need it?
        newState.currentUser = action.payload;
      })
      .addCase(autorizationByToken.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
        newState.currentUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        const newState = state;
        newState.isLoading = false;
        newState.currentUser = null;
        newState.isAutorized = false;
      });
  },
});

export default authSlice.reducer;
