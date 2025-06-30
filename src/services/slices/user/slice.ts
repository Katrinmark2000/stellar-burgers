import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUser,
  logoutUser,
  setUser,
  registerUser,
  updateUser
} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  errorUser: string | undefined;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  errorUser: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserError: (state) => state.errorUser
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.errorUser = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorUser = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorUser = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload; // обновляем текущего пользователя
      });
  }
});

export const { setAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked, getUserError } = userSlice.selectors;
