import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '../../../utils/types';
import { orderCreate } from './actions';

type TConstructorBurgerState = {
  constructorItems: {
    ingredients: Array<TConstructorIngredient>;
    bun: TIngredient | null;
  };
  orderRequest: boolean;
  orderModalData: null | TOrder;
  error: string | null | undefined;
  loading: boolean;
};

export const initialState: TConstructorBurgerState = {
  constructorItems: {
    ingredients: [],
    bun: null
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false
};

export const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addBunAndIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          //елси это булка, то добавляем в булочку
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload); //если не булка, то в массив ингредиентов
        }
      },
      prepare: (ingredient: TIngredient) => {
        //добавляем униклаьный айди ингредентам, чтобы можно было потом использовать экшн в компоненте
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id //удаление ингредиента по айди
        );
    },
    clearOrder: (state) => {
      //очищаем конструктор от всех constructorItems
      (state.constructorItems.bun = null),
        (state.constructorItems.ingredients = []);
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      //поднимаем ингредиент наверх
      const index = action.payload;
      if (index > 0) {
        //если он найден и не на первом месте в массиве (те >0), то поднимаем наверх
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ]; //деструктуризации массива, тупо меняем местами
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      //поднимаем ингредиент наверх
      const index = action.payload;
      if (index > 0 && state.constructorItems.ingredients.length - 1) {
        //если он найден и не на первом месте в массиве (те >0) и не на последнем, то опускаем
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ]; //деструктуризации массива, тупо меняем местами
      }
    },
    resetConstructor: (state) => initialState
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
        state.constructorItems.ingredients = [];
        state.constructorItems.bun = null;
      });
  },

  selectors: {
    setOrderRequest: (state) => state.orderRequest, //отслеживаем состояние запроса на создание заказа, его выполнение
    setOrderModalData: (state) => state.orderModalData, //данные модалки заказа
    getConstructorItems: (state) => state.constructorItems //данные булок и ингредиентов
  }
});

export const { setOrderRequest, setOrderModalData, getConstructorItems } =
  constructorBurgerSlice.selectors;
export const {
  addBunAndIngredient,
  deleteIngredient,
  clearOrder,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorBurgerSlice.actions;

/*tconst bookSlice = createSlice({
    name: 'book',
  initialState,
  reducers: {
        addBook: {
            reducer: (state, action: PayloadAction<TBookWithKey>) => {
                state.books.push(action.payload);
      },
      prepare: (book: TBook) => {
                const key = nanoid();
        return { payload: {...book, key } };
      }
    },
    removeBook: (state, action: PayloadAction<string> => {
            state.books = state.books.filter(b => b.id !== action.payload);
    }
  },
  selectors: {
        getBooks: (state) => state.books,
  },
  extraReducers: (builder) => {
    builder.addCase(moveBook, (state, action) => {
      state.books.splice(
        action.payload.to,
        0,
        state.books.splice(action.payload.from, 1)[0]
      );
    }
  } 
});

export const { getBook } = bookSlice.selectors; */
