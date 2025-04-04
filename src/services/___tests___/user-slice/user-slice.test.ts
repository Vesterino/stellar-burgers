import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { configureStore } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../../utils/cookie';
import userReducer, {
  authChecked,
  getUserAuth,
  getUserOrders,
  loginUserAuth,
  logoutUserAuth,
  registerUserAuth,
  setUser,
  updateUserAuth,
  userLogout,
  UserState
} from '../../slices/user-slice';

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
};

jest.mock('../../../utils/cookie');
jest.mock('@api');

describe('слайс пользователя', () => {
  let store: ReturnType<typeof configureStore<{ user: UserState }>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    jest.clearAllMocks();
  });

  describe('редюсеры слайса пользователя', () => {
    test('установка флага authChecked', () => {
      store.dispatch(authChecked());
      const state = store.getState().user;
      expect(state.isAuthChecked).toBe(true);
    });

    test('должен установить пользователя', () => {
      const mockUser = { name: 'Test User', email: 'test@test.com' } as TUser;
      store.dispatch(setUser(mockUser));
      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    test('обработка выхода пользователя', () => {
      store.dispatch(userLogout());
      const state = store.getState().user;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('асихронные санки', () => {
    const mockUser = { name: 'Test User', email: 'test@test.com' } as TUser;
    const mockResponse = {
      user: mockUser,
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token'
    };

    test('обработка успешной регистрации', async () => {
      (registerUserApi as jest.Mock).mockResolvedValue(mockResponse);

      await store.dispatch(
        registerUserAuth({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password'
        })
      );

      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockResponse.accessToken
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refreshToken',
        mockResponse.refreshToken
      );

      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    test('обработка успешного входа', async () => {
      (loginUserApi as jest.Mock).mockResolvedValue(mockResponse);

      await store.dispatch(
        loginUserAuth({ email: 'test@test.com', password: 'password' })
      );

      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockResponse.accessToken
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refreshToken',
        mockResponse.refreshToken
      );

      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    test('получение данных пользователя', async () => {
      (getUserApi as jest.Mock).mockResolvedValue({ user: mockUser });

      await store.dispatch(getUserAuth());

      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    test('обновление данных пользователя', async () => {
      (updateUserApi as jest.Mock).mockResolvedValue({ user: mockUser });

      await store.dispatch(
        updateUserAuth({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password'
        })
      );

      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    test('обработка успешного выхода', async () => {
      (logoutApi as jest.Mock).mockResolvedValue({ success: true });

      await store.dispatch(logoutUserAuth());

      expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
      expect(setCookie).toHaveBeenCalledWith('accessToken', '', {
        expires: -1
      });

      const state = store.getState().user;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    test('получение заказа пользователя', async () => {
      const mockOrders = [{ id: 1, number: 123 }];
      (getOrdersApi as jest.Mock).mockResolvedValue(mockOrders);

      await store.dispatch(getUserOrders());

      const state = store.getState().user;
      expect(state.orders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });

    test('обработка ошибки регистрации', async () => {
      const errorMessage = 'Registration failed';
      (registerUserApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await store.dispatch(
        registerUserAuth({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password'
        })
      );

      const state = store.getState().user;
      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
    });

    test('обработка ошибки входа', async () => {
      const errorMessage = 'Login failed';
      (loginUserApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await store.dispatch(
        loginUserAuth({ email: 'test@test.com', password: 'password' })
      );

      const state = store.getState().user;
      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
    });
  });
});
