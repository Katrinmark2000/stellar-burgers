import { initialState, userSlice } from '../services/slices/user/slice';
import {
  loginUser,
  logoutUser,
  setUser,
  registerUser,
  updateUser
} from '../services/slices/user/actions';

describe('userSlice', () => {
    it('обновляет состояние при loginUser.fulfilled', () => {
      const mockUser = { id: '1', name: 'Иван', email: 'ivan@example.com' };
      const state = { ...initialState, errorUser: 'ошибка' };
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const newState = userSlice.reducer(state, action);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.errorUser).toBeUndefined();
    });
  
    it('записывает ошибку при loginUser.rejected', () => {
      const errorMsg = 'Ошибка входа';
      const state = { ...initialState };
      const action = { type: loginUser.rejected.type, error: { message: errorMsg } };
      const newState = userSlice.reducer(state, action);
      expect(newState.errorUser).toBe(errorMsg);
    });
  
    it('обнуляет пользователя при logoutUser.fulfilled', () => {
      const state = { ...initialState, user: { id: '1', name: 'Иван', email: 'katrin-test@mail.ru' } };
      const action = { type: logoutUser.fulfilled.type };
      const newState = userSlice.reducer(state, action);
      expect(newState.user).toBeNull();
    });
  
    it('устанавливает пользователя при setUser', () => {
      const userData = { id: '2', name: 'Петр' };
      const state = { ...initialState };
      const action = { type: setUser.type, payload: userData };
      const newState = userSlice.reducer(state, action);
      expect(newState.user).toEqual(userData);
    });
  
    it('обновляет пользователя при registerUser.fulfilled', () => {
      const newUser = { id: '3', name: 'Анна' };
      const state = { ...initialState };
      const action = { type: registerUser.fulfilled.type, payload: newUser };
      const newState = userSlice.reducer(state, action);
      expect(newState.user).toEqual(newUser);
    });
  
    it('записывает ошибку при registerUser.rejected', () => {
      const errorMsg = 'Ошибка регистрации';
      const state = { ...initialState };
      const action = { type: registerUser.rejected.type, error: { message: errorMsg } };
      const newState = userSlice.reducer(state, action);
      expect(newState.errorUser).toBe(errorMsg);
    });
  
    it('обновляет пользователя при updateUser.fulfilled', () => {
      const updatedUser = { id: '4', name: 'Мария' };
      const state = { ...initialState, user: { id: '4', name: 'Мария', email: 'Katrinka25@mail.ru' } };
      const action = { type: updateUser.fulfilled.type, payload: updatedUser };
      const newState = userSlice.reducer(state, action);
      expect(newState.user).toEqual(updatedUser);
    });
  });
