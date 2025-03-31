import { TConstructorIngredient } from '@utils-types';
import constructorOrderSlice, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState
} from '../../slices/constructorOrder-slice';
import { describe, test, expect } from '@jest/globals';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'unique-id')
}));

describe('проверка редьюсеров слайса constructor', () => {
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

  test('обработка добавления булочки', () => {
    const bunMock: TConstructorIngredient = {
      _id: '1',
      id: '1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'bun-image-url',
      image_mobile: 'bun-image-mobile-url',
      image_large: 'bun-image-large-url',
      uniqueId: 'unique-bun-id'
    };

    const nextState = constructorOrderSlice(initialState, addBun(bunMock));

    expect(nextState.bun).toEqual(bunMock);

    const newBunMock: TConstructorIngredient = {
      ...bunMock,
      _id: '1',
      id: '1',
      name: 'Черная булка Dark Side',
      uniqueId: 'unique-bun-id-2'
    };

    const updatedState = constructorOrderSlice(nextState, addBun(newBunMock));

    expect(updatedState.bun).toEqual(newBunMock);
  });

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
