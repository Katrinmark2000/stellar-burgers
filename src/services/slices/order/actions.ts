import { getOrdersApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//получаем все наши заказы
export const ordersUser = createAsyncThunk('user/ordersUser', getOrdersApi);
