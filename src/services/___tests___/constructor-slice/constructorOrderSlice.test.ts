import { TConstructorIngredient } from '@utils-types';
import constructorOrderSlice, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  ConstructorOrderState
} from '../../slices/constructorOrder-slice';
import { describe, test, expect } from '@jest/globals';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'unique-id')
}));

describe('Проверка редьюсеров слайса constructor', () => {
  let initialState: ConstructorOrderState;

  beforeEach(() => {
    initialState = {
      bun: null,
      ingredients: [],
      selectedIngredients: [],
      orderRequest: false,
      orderModalData: null
    };
  });

  const ingredientMock: TConstructorIngredient = {
    _id: '1',
    id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url',
    uniqueId: 'unique-id'
  };

  const ingredientMockTwo: TConstructorIngredient = {
    _id: '2',
    id: '2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'tomato-image-url',
    image_mobile: 'tomato-image-mobile-url',
    image_large: 'tomato-image-large-url',
    uniqueId: 'unique-id-2'
  };

  test('обработка добавления ингредиента', () => {
    const nextState = constructorOrderSlice(
      initialState,
      addIngredient(ingredientMock)
    );
    expect(nextState.selectedIngredients).toHaveLength(1);
    expect(nextState.selectedIngredients[0]).toEqual(ingredientMock);
  });

  test('обработка удаления ингредиента', () => {
    const state = { ...initialState, selectedIngredients: [ingredientMock] };
    const nextState = constructorOrderSlice(state, removeIngredient('1'));
    expect(nextState.selectedIngredients).toHaveLength(0);
  });

  test('обработка изменения порядка ингредиентов', () => {
    const state = {
      ...initialState,
      selectedIngredients: [ingredientMock, ingredientMockTwo]
    };
    const nextState = constructorOrderSlice(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(nextState.selectedIngredients[0]._id).toBe('2');
    expect(nextState.selectedIngredients[1]._id).toBe('1');
  });
});
