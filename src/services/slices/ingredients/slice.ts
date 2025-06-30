import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../../utils/types';
import { getIngredients } from './actions';

//Данные ингредиентов
type TIngredientState = {
  ingredients: Array<TIngredient>;
  error: string | null | undefined;
  loading: boolean;
};

//Начальное состояние, все чистое
export const initialState: TIngredientState = {
  ingredients: [],
  error: null,
  loading: false
};

//слайс ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelect: (state) => state.ingredients, //возвращает всю часть состояния, связанную с ингредиентами
    getIngredientsLoadingStatus: (state) => state.loading //возвращает состояние загрузки
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //если ошибка
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload; //если все ок, получаем данные
      });
  }
});

export const { getIngredientsSelect, getIngredientsLoadingStatus } =
  ingredientsSlice.selectors;
