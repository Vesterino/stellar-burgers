import { getFeedsApi } from '@api';
import feedReducer, { getFeed, TFeedState } from '../../slices/feed-slice';

jest.mock('@api');

describe('feed slice', () => {
  const initialState: TFeedState = {
    orders: [],
    orderData: null,
    total: null,
    totalToday: null,
    isLoading: false,
    error: null
  };

  const mockOrders = {
    orders: [
      {
        _id: '1',
        ingredients: ['ingredient1', 'ingredient2'],
        status: 'done',
        name: 'Тестовый бургер',
        number: 1234,
        createdAt: '2024-03-20',
        updatedAt: '2024-03-20'
      }
    ],
    total: 100,
    totalToday: 10
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('возвращение начального состояния', () => {
    expect(feedReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('getFeed', () => {
    test('обработка pending состояния', () => {
      const action = { type: getFeed.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('обработка fulfilled состояния', () => {
      const action = {
        type: getFeed.fulfilled.type,
        payload: mockOrders
      };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders.orders);
      expect(state.total).toBe(mockOrders.total);
      expect(state.totalToday).toBe(mockOrders.totalToday);
      expect(state.error).toBeNull();
    });

    test('обработка rejected состояния', () => {
      const action = {
        type: getFeed.rejected.type,
        error: { message: 'Тестовая ошибка' }
      };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Тестовая ошибка');
    });

    test('должен успешно получить данные через thunk', async () => {
      (getFeedsApi as jest.Mock).mockResolvedValue(mockOrders);

      const dispatch = jest.fn();
      const thunk = getFeed();

      await thunk(dispatch, () => ({}), {});

      const [pending, fulfilled] = dispatch.mock.calls.map(
        (call) => call[0].type
      );

      expect(pending).toBe(getFeed.pending.type);
      expect(fulfilled).toBe(getFeed.fulfilled.type);
      expect(getFeedsApi).toHaveBeenCalled();
    });
  });
});
