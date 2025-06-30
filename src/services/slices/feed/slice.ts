import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { feedsAll, orderByNumber } from './actions';

//Данные заказов в ленте
type TFeed = {
  orders: TOrder[];
  total: number;
  error: string | null | undefined;
  loading: boolean;
  orderNumber: TOrder | null;
  totalToday: number;
};

//Начальное состояние, все чистое
export const initialState: TFeed = {
  orders: [],
  total: 0,
  error: null,
  loading: false,
  orderNumber: null,
  totalToday: 0
};

//слайс заказов в ленте
export const getOrderNumberUserSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state.orders,
    getOrderByNumber: (state) => state.orderNumber,
    getTotalOrders: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },

  extraReducers: (builder) => {
    builder
      .addCase(feedsAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feedsAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //если ошибка
      })
      .addCase(feedsAll.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; //если все ок, получаем данные заказов
        state.total = action.payload.total; //если все ок, получаем данные кол-во всх заказов
        state.totalToday = action.payload.totalToday; //если все ок, получаем данные заказо о сегодня
      })
      .addCase(orderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //если ошибка
      })
      .addCase(orderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderNumber = action.payload.orders[0];
      });
  }
});

export const {
  getOrdersFeed,
  getOrderByNumber,
  getTotalOrders,
  getTotalToday
} = getOrderNumberUserSlice.selectors;
