import store from '../services/store';
import { RootState } from '../services/store';


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
    }
    )
}
)
