// import { getFeed, feedSlice, TFeedState } from '../../slices/feed-slice';
// import { getFeedsApi } from '@api';
// import { describe, test, expect } from '@jest/globals';

// jest.mock('@api', () => ({
//   getFeedsApi: jest.fn()
// }));

// describe('feedSlice', () => {
//   const initialState: TFeedState = {
//     orders: [],
//     orderData: null,
//     total: null,
//     totalToday: null,
//     isLoading: false,
//     error: null
//   };

//   test('should return the initial state', () => {
//     expect(feedSlice.reducer(undefined, { type: 'unknown' })).toEqual(
//       initialState
//     );
//   });

//   describe('getFeed async thunk', () => {
//     it('should handle pending state', () => {
//       const action = { type: getFeed.pending.type };
//       const nextState = feedSlice.reducer(initialState, action);
//       expect(nextState.isLoading).toBe(true);
//       expect(nextState.error).toBeNull();
//     });

//     test('should handle fulfilled state', async () => {
//       const mockResponse = {
//         orders: [{ id: 1, name: 'order 1' }],
//         total: 100,
//         totalToday: 10
//       };
//       getFeedsApi.mockResolvedValue(mockResponse);

//       const action = await getFeed.fulfilled(mockResponse, '', undefined);
//       const nextState = feedSlice.reducer(initialState, action);

//       expect(nextState.isLoading).toBe(false);
//       expect(nextState.orders).toEqual(mockResponse.orders);
//       expect(nextState.total).toBe(mockResponse.total);
//       expect(nextState.totalToday).toBe(mockResponse.totalToday);
//     });

//     test('should handle rejected state', async () => {
//       const mockError = new Error('Network error');
//       getFeedsApi.mockRejectedValue(mockError);

//       const action = await getFeed.rejected(mockError, '', undefined);
//       const nextState = feedSlice.reducer(initialState, action);

//       expect(nextState.isLoading).toBe(false);
//       expect(nextState.error).toBe('Network error');
//     });
//   });

//   describe('reducers', () => {
//     it('should set isLoading to true on pending', () => {
//       const action = { type: getFeed.pending.type };
//       const nextState = feedSlice.reducer(initialState, action);
//       expect(nextState.isLoading).toBe(true);
//     });

//     test('should set orders on fulfilled', () => {
//       const mockOrders = [{ id: 1, name: 'Order 1' }];
//       const action = {
//         type: getFeed.fulfilled.type,
//         payload: { orders: mockOrders, total: 100, totalToday: 50 }
//       };
//       const nextState = feedSlice.reducer(initialState, action);
//       expect(nextState.orders).toEqual(mockOrders);
//       expect(nextState.total).toBe(100);
//       expect(nextState.totalToday).toBe(50);
//     });

//     test('should set error message on rejected', () => {
//       const errorMessage = 'Error fetching data';
//       const action = {
//         type: getFeed.rejected.type,
//         error: { message: errorMessage }
//       };
//       const nextState = feedSlice.reducer(initialState, action);
//       expect(nextState.isLoading).toBe(false);
//       expect(nextState.error).toBe(errorMessage);
//     });
//   });
// });
