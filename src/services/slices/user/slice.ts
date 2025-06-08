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
  errorUser: string | null;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  errorUser: null
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
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload; // обновляем текущего пользователя
      });
  }
});

export const { setAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
