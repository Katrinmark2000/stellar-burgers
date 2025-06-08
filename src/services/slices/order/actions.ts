import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//получаем все наши заказы
export const ordersUser = createAsyncThunk('user/ordersUser', async () => {
  //данные заказов
  const response = await getOrdersApi();
  return response; // если успешно, то получаем историю заказов
});
