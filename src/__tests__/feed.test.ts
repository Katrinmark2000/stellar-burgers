import { initialState, getOrderNumberUserSlice } from '../services/slices/feed/slice';
import { feedsAll, orderByNumber } from '../services/slices/feed/actions'; 

describe('getOrderNumberUserSlice', () => {
    it('устанавливает loading в true при feedsAll.pending', () => {
      const state = { ...initialState };
      const action = { type: feedsAll.pending.type };
      const newState = getOrderNumberUserSlice.reducer(state, action);
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  
    it('обновляет данные и устанавливает loading в false при feedsAll.fulfilled', () => {
      const mockPayload = {
        orders: [
          { id: '1', items: [], total: 50 },
          { id: '2', items: [], total: 100 }
        ],
        total: 2,
        totalToday: 1
      };
      const state = { ...initialState, loading: true };
      const action = { type: feedsAll.fulfilled.type, payload: mockPayload };
      const newState = getOrderNumberUserSlice.reducer(state, action);
      expect(newState.loading).toBe(false);
      expect(newState.orders).toEqual(mockPayload.orders);
      expect(newState.total).toBe(mockPayload.total);
      expect(newState.totalToday).toBe(mockPayload.totalToday);
    });
  
    it('записывает ошибку и устанавливает loading в false при feedsAll.rejected', () => {
      const errorMessage = 'Ошибка загрузки ленты';
      const state = { ...initialState, loading: true };
      const action = { type: feedsAll.rejected.type, error: { message: errorMessage } };
      const newState = getOrderNumberUserSlice.reducer(state, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  
    it('устанавливает loading в true при orderByNumber.pending', () => {
      const state = { ...initialState };
      const action = { type: orderByNumber.pending.type };
      const newState = getOrderNumberUserSlice.reducer(state, action);
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  
    it('записывает первый заказ и устанавливает loading в false при orderByNumber.fulfilled', () => {
      const mockOrder = { id: '123', items: [], total: 75 };
      const mockPayload = { orders: [mockOrder] };
      const state = { ...initialState, loading: true };
      const action = { type: orderByNumber.fulfilled.type, payload: mockPayload };
      const newState = getOrderNumberUserSlice.reducer(state, action);
      expect(newState.loading).toBe(false);
      expect(newState.orderNumber).toEqual(mockOrder);
    });
  
    it('записывает ошибку и устанавливает loading в false при orderByNumber.rejected', () => {
      const errorMessage = 'Ошибка получения заказа по номеру';
      const state = { ...initialState, loading: true };
      const action = { type: orderByNumber.rejected.type, error: { message: errorMessage } };
      const newState = getOrderNumberUserSlice.reducer(state, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });
