import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

//Получение ингредиентов, асинхронная функция
export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const response = await getIngredientsApi();
    return response; // если успешно, то значение будет доступно в action.payload в экстраредьюсере. Если запрос завершится с ошибкой, ошибка будет в action.error.
  }
);
