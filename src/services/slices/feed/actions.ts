import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//получаем данные заказов в ленте
export const feedsAll = createAsyncThunk('feed/all', () => getFeedsApi());

//получаем номер заказа
export const orderByNumber = createAsyncThunk(
  'feed/number',
  async (number: number) => {
    //Получаем номер заказа
    const response = await getOrderByNumberApi(number);
    return response; // если успешно, то получаем номер заказа
  }
);
