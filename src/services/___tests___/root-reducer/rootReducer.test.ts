import { describe, test, expect } from '@jest/globals';
import { rootReducer } from '../../store';

describe('Инициализация rootReducer', () => {
  test('Инициализация начального состояния', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
});
