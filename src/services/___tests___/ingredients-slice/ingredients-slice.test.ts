import ingredientsReducer, {
  getIngredients,
  TIngredientsState
} from '../../slices/ingredients-slice';
import { getIngredientsApi } from '@api';
import { describe, test, expect, jest } from '@jest/globals';
import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientsSlice', () => {
  let initialState: TIngredientsState;
  const mockData: TIngredient[] = [
    {
      _id: '1',
      name: 'Cheese',
      type: 'dairy',
      proteins: 25,
      fat: 20,
      carbohydrates: 5,
      calories: 300,
      price: 100,
      image: 'cheese.png',
      image_mobile: 'cheese-mobile.png',
      image_large: 'cheese-large.png'
    }
  ];

  beforeEach(() => {
    initialState = {
      items: [],
      isLoading: false,
      error: null
    };
  });

  test('should handle initial state', () => {
    expect(ingredientsReducer(undefined, {} as PayloadAction)).toEqual(
      initialState
    );
  });

  test('should handle getIngredients.pending', () => {
    const nextState = ingredientsReducer(
      initialState,
      getIngredients.pending('requestId')
    );
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('should handle getIngredients.fulfilled', () => {
    const nextState = ingredientsReducer(
      initialState,
      getIngredients.fulfilled(mockData, 'requestId')
    );
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      items: mockData,
      error: null
    });
  });

  test('should handle getIngredients.rejected', () => {
    const error = 'Failed to fetch';
    const nextState = ingredientsReducer(
      initialState,
      getIngredients.rejected(new Error(error), 'requestId')
    );
    expect(nextState).toEqual({ ...initialState, isLoading: false, error });
  });

  test('should dispatch correct actions for getIngredients', async () => {
    const dispatch = jest.fn();
    const thunk = getIngredients();

    (getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockData);

    await thunk(dispatch, () => initialState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      getIngredients.pending(expect.any(String))
    );
    expect(dispatch).toHaveBeenCalledWith(
      getIngredients.fulfilled(mockData, expect.any(String))
    );
  });
});
