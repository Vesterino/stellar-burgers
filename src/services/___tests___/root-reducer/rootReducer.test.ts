import store from '../../store';
import { RootState } from '../../store';
import { describe, test, expect } from '@jest/globals';

describe('Инициализация rootReducer', () => {
  test('Инициализация начального состояния', () => {
    const state: RootState = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('constructorOrder');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');

    expect(state.ingredients).toBeDefined();
    expect(state.constructorOrder).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.user).toBeDefined();
  });
});
