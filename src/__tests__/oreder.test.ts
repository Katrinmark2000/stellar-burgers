import { initialState, getOrdersUserSlice } from '../services/slices/order/slice';
import { ordersUser } from '../services/slices/order/actions';

describe('Тест заказа', () => {
    test('устанавливает loading в true при pending', () => {
      const state = { ...initialState };
      const action = { type: ordersUser.pending.type };
      const newState = getOrdersUserSlice.reducer(state, action);
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  
    test('записывает заказы и устанавливает loading в false при fulfilled', () => {
      const mockOrders = [
        { id: 'order1', items: [], total: 100 },
        { id: 'order2', items: [], total: 200 }
      ];
      const state = { ...initialState, loading: true };
      const action = { type: ordersUser.fulfilled.type, payload: mockOrders };
      const newState = getOrdersUserSlice.reducer(state, action);
      expect(newState.loading).toBe(false);
      expect(newState.orders).toEqual(mockOrders);
    });
  
    test('записывает ошибку и устанавливает loading в false при rejected', () => {
      const errorMessage = 'Ошибка получения заказов';
      const state = { ...initialState, loading: true };
      const action = { type: ordersUser.rejected.type, error: { message: errorMessage } };
      const newState = getOrdersUserSlice.reducer(state, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });
