import {
  initialState,
  ingredientsSlice
} from '../services/slices/ingredients/slice';
import { getIngredients } from '../services/slices/ingredients/actions';

describe('ingredientsSlice', () => {
  test('обновляет loading на true при pending', () => {
    const state = { ...initialState };
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsSlice.reducer(state, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('записывает ингредиенты и устанавливает loading в false при fulfilled', () => {
    const mockIngredients = [
      { _id: '1', name: 'Ингредиент 1' },
      { _id: '2', name: 'Ингредиент 2' }
    ];
    const state = { ...initialState, loading: true };
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsSlice.reducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(mockIngredients);
  });

  test('записывает ошибку и устанавливает loading в false при rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = { ...initialState, loading: true };
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const newState = ingredientsSlice.reducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});
