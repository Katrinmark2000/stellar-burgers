import { orderBurgerApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//создаем заказ и отправляем
export const orderCreate = createAsyncThunk(
  'order/create',
  async (data: string[]) => {
    //данные заказа orderBurgerApi
    const response = await orderBurgerApi(data);
    return response; // если успешно, то отправяем заказик
  }
);
