import { describe, test, expect } from '@jest/globals';
import { rootReducer } from '../../store';

describe('Инициализация rootReducer', () => {
  test('Инициализация начального состояния', () => {
    const action = { type: 'UKNOWN_ACTION' };
    const result = rootReducer(undefined, action);

    expect(result).toEqual(rootReducer(undefined, { type: '@@INIT' }));
  });
});
