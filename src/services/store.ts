import { configureStore, combineSlices } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './slices/user/slice';
import { ingredientsSlice } from './slices/ingredients/slice';
import { constructorBurgerSlice } from './slices/constructor/slice';
import { getOrdersUserSlice } from './slices/order/slice';
import { getOrderNumberUserSlice } from './slices/feed/slice';

//делаем корневой редьюсер
const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  constructorBurgerSlice,
  getOrdersUserSlice,
  getOrderNumberUserSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
