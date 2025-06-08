import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { setAuthChecked } from './slice';
import { getCookie, setCookie } from '../../../utils/cookie';

export const setUser = createAction<TUser | null, 'user/setUser'>(
  'user/setUser'
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const response = await loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  return response;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const user = await getUserApi();
        dispatch(setUser(user.user));
      } catch (error) {
        dispatch(setUser(null));
      }
    }
    dispatch(setAuthChecked(true));
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, password, name }: TRegisterData) => {
    const response = await registerUserApi({ email, password, name });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ email, password, name }: TRegisterData) => {
    const response = await updateUserApi({ email, password, name });
    return response.user;
  }
);
