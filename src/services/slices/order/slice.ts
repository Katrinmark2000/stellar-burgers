import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { ordersUser } from './actions';

//Данные заказов
type TOrdersUser = {
  orders: TOrder[];
  error: string | null | undefined;
  loading: boolean;
};

//Начальное состояние, все чистое
export const initialState: TOrdersUser = {
  orders: [],
  error: null,
  loading: false
};

//слайс номера заказов
export const getOrdersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {},
  selectors: {
    getOrdersUser: (state) => state.orders, //возвращает все айдишки заказов
    getOrdersUserLoadingStatus: (state) => state.loading //возвращает состояние загрузки
  },

  extraReducers: (builder) => {
    builder
      .addCase(ordersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ordersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //если ошибка
      })
      .addCase(ordersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; //если все ок, получаем данные
      });
  }
});

export const { getOrdersUser, getOrdersUserLoadingStatus } =
  getOrdersUserSlice.selectors;
