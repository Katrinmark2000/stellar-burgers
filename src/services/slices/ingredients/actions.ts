import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';

//Получение ингредиентов, асинхронная функция
export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);
