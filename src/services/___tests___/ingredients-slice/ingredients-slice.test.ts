import { TIngredient } from '@utils-types';
import {
  getIngredients,
  ingredientsSlice
} from '../../slices/ingredients-slice';

describe('ingredients slice', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'test.jpg',
      image_mobile: 'test-mobile.jpg',
      image_large: 'test-large.jpg'
    }
  ];

  test('возвращение начального состояния', () => {
    const result = ingredientsSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('обработка pending состояния', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('обработка fulfilled состояния', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      items: mockIngredients,
      error: null
    });
  });

  test('обработка rejected состояния', () => {
    const error = 'Ошибка загрузки';
    const action = { type: getIngredients.rejected.type, payload: error };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: error
    });
  });
});
