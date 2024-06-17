import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk';
import {
  RegistartionUser,
  loginAfterRegister,
  loginByToken,
  loginWithPassword,
} from '../api/authintification/authMethods';
import { LoginForm } from '../pages/Login/LoginPage';
import { RegisterFormFields } from '../pages/Register/Component/interfaceRegister';

// const key = 'tokendata';
// const storedData = localStorage.getItem(key);
// const { token } = storedData ? JSON.parse(storedData) : { token: null };
export interface AuthorizationState {
  currentUser: null | Customer;
  isAutorized: boolean;
  isLoading: boolean;
}

const initialState: AuthorizationState = {
  currentUser: null,
  isAutorized: false,
  isLoading: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterFormFields, thunkAPI) => {
    try {
      const response = await RegistartionUser(userData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message); // ???
      }
      throw new Error('Error from REDUX login function');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData: LoginForm, thunkAPI) => {
    try {
      const { email, password } = userData;
      const response = await loginWithPassword(email, password);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message); // ???
      }
      throw new Error('Error from REDUX login function');
    }
  }
);

export const loginAfterSuccesRegister = createAsyncThunk(
  'auth/loginAfterRegister',
  async (userData: LoginForm, thunkAPI) => {
    try {
      const { email, password } = userData;
      const response = await loginAfterRegister(email, password);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
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
      .addCase(loginAfterSuccesRegister.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(loginAfterSuccesRegister.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.isAutorized = true;
        newState.currentUser = action.payload;
      })
      .addCase(loginAfterSuccesRegister.rejected, (state) => {
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
        newState.isAutorized = true;
        newState.currentUser = action.payload;
      })
      .addCase(autorizationByToken.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
        newState.currentUser = null;
      })
      .addCase(register.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        const newState = state;
        newState.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        const newState = state;
        newState.isLoading = false;
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
