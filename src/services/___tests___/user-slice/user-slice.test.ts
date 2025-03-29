// import { configureStore } from '@reduxjs/toolkit';
// import userReducer, {
//   registerUserAuth,
//   loginUserAuth,
//   getUserAuth,
//   updateUserAuth,
//   logoutUserAuth,
//   getUserOrders,
//   setUser,
//   userLogout
// } from '../../slices/user-slice';
// import {
//   registerUserApi,
//   loginUserApi,
//   getUserApi,
//   updateUserApi,
//   logoutApi,
//   getOrdersApi
// } from '@api';

// describe('userSlice', () => {
//   let store;

//   beforeEach(() => {
//     store = configureStore({ reducer: { user: userReducer } });
//   });

//   it('should handle setUser', () => {
//     const user = { id: 1, name: 'John Doe' };
//     store.dispatch(setUser(user));
//     const state = store.getState().user;
//     expect(state.user).toEqual(user);
//     expect(state.isAuthenticated).toBe(true);
//     expect(state.isAuthChecked).toBe(true);
//   });

//   it('should handle userLogout', () => {
//     store.dispatch(userLogout());
//     const state = store.getState().user;
//     expect(state.user).toBeNull();
//     expect(state.isAuthenticated).toBe(false);
//     expect(state.isAuthChecked).toBe(false);
//   });

//   describe('Async Actions', () => {
//     it('should handle loginUserAuth.fulfilled', async () => {
//       const user = { id: 1, name: 'John Doe' };
//       loginUserApi.mockResolvedValueOnce({
//         user,
//         accessToken: 'access',
//         refreshToken: 'refresh'
//       });

//       await store.dispatch(
//         loginUserAuth({ email: 'test@example.com', password: 'password' })
//       );
//       const state = store.getState().user;

//       expect(state.user).toEqual(user);
//       expect(state.isAuthenticated).toBe(true);
//       expect(state.isLoading).toBe(false);
//       expect(state.error).toBeNull();
//     });

//     it('should handle loginUserAuth.rejected', async () => {
//       loginUserApi.mockRejectedValueOnce(new Error('Invalid credentials'));

//       await store.dispatch(
//         loginUserAuth({ email: 'test@example.com', password: 'password' })
//       );
//       const state = store.getState().user;

//       expect(state.isAuthenticated).toBe(false);
//       expect(state.isLoading).toBe(false);
//       expect(state.error).toBe('Invalid credentials');
//     });

//     it('should handle registerUserAuth.fulfilled', async () => {
//       const user = { id: 1, name: 'John Doe' };
//       registerUserApi.mockResolvedValueOnce({
//         user,
//         accessToken: 'access',
//         refreshToken: 'refresh'
//       });

//       await store.dispatch(
//         registerUserAuth({ email: 'test@example.com', password: 'password' })
//       );
//       const state = store.getState().user;

//       expect(state.user).toEqual(user);
//       expect(state.isAuthenticated).toBe(true);
//       expect(state.isLoading).toBe(false);
//       expect(state.error).toBeNull();
//     });

//     it('should handle getUserAuth.fulfilled', async () => {
//       const user = { id: 1, name: 'John Doe' };
//       getUserApi.mockResolvedValueOnce({ user });

//       await store.dispatch(getUserAuth());
//       const state = store.getState().user;

//       expect(state.user).toEqual(user);
//       expect(state.isAuthenticated).toBe(true);
//       expect(state.isAuthChecked).toBe(true);
//     });

//     it('should handle logoutUserAuth.fulfilled', async () => {
//       logoutApi.mockResolvedValueOnce(true);

//       await store.dispatch(logoutUserAuth());
//       const state = store.getState().user;

//       expect(state.user).toBeNull();
//       expect(state.isAuthenticated).toBe(false);
//       expect(state.isAuthChecked).toBe(true);
//       expect(state.isLoading).toBe(false);
//     });

//     it('should handle getUserOrders.fulfilled', async () => {
//       const orders = [{ id: 1, product: 'Product 1' }];
//       getOrdersApi.mockResolvedValueOnce(orders);

//       await store.dispatch(getUserOrders());
//       const state = store.getState().user;

//       expect(state.orders).toEqual(orders);
//       expect(state.error).toBeNull();
//     });
//   });
// });
