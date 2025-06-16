import store from '../services/store';
import { RootState, rootReducer } from '../services/store';

describe('rootReducer', () => {
  it('должен инициализировать состояние корректно', () => {
    const state: RootState = store.getState();

    expect(state.ingredients).toEqual({
      ingredients: [],
      error: null,
      loading: false
    });

    expect(state.ordersUser).toEqual({
      orders: [],
      error: null,
      loading: false
    });

    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      errorUser: undefined
    });

    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      error: null,
      loading: false,
      orderNumber: null,
      totalToday: 0
    });

    expect(state.constructorBurger).toEqual({
      constructorItems: {
        ingredients: [],
        bun: null
      },
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    });
  });

  it('не мутирует состояние при вызове с неизвестным экшеном', () => {
    const currentState = store.getState();

    //создаем фиктивный неизвестный экшен
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    //вызываем редьюсер напрямую с текущим состоянием и неизвестным экшеном
    const newState = rootReducer(currentState, unknownAction);

    //проверяем, что состояние не изменилось (сравниваем по ссылке)
    expect(newState).toBe(currentState);
  });
});
