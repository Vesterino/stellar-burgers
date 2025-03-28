import constructorOrderSlice, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../../slices/constructorOrder-slice';
import { describe, test, expect } from '@jest/globals';

describe('Проверка редьюсеров слайса constructor', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    selectedIngredients: [],
    orderRequest: false,
    orderModalData: null
  };

  test('добавление ингредиента в конструктор', () => {
    const ingredient = { id: '1', uniqueId: '1' };
    const action = addIngredient(ingredient);
    const state = constructorOrderSlice(initialState, action);

    expect(state.ingredients).toContain(ingredient);
  });
});

// test('удаление ингредиента из конструктора', () => {
//   const ingredient = { id: '1', uniqueId: '1' };
//   const stateWithIngredient = {
//     ...initialState,
//     ingredient: [ingredient]
//   };
//   const action =
// });
