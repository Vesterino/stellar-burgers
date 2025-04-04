import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TOrder, TUser } from '@utils-types';

export type UserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  orders: TOrder[];
  user: TUser | null;
  error: string | null;
  isLoading: boolean;
};

export const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  orders: [],
  error: null,
  isLoading: false
};

export const registerUserAuth = createAsyncThunk(
  'user/registerUserAuth',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUserAuth = createAsyncThunk(
  'user/loginUserAuth',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const getUserAuth = createAsyncThunk('user/getUserAuth', async () => {
  const response = await getUserApi();
  return response;
});

export const updateUserAuth = createAsyncThunk(
  'user/updateUserAuth',
  async (user: TRegisterData) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);

export const logoutUserAuth = createAsyncThunk(
  'user/logoutUserAuth',
  async () => {
    await logoutApi();
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', '', { expires: -1 });
    return true;
  }
);

export const getUserOrders = createAsyncThunk(
  'user/getUserOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthChecked = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAuth.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.payload as string;
      })
      .addCase(registerUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUserAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(loginUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUserAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })
      .addCase(updateUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка смены данных профиля';
      })
      .addCase(logoutUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserAuth.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(logoutUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка деавторизации';
      })
      .addCase(getUserOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const { authChecked, setUser, userLogout } = userSlice.actions;

export default userSlice.reducer;
