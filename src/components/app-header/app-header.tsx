import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser } from '../../services/slices/user/slice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getUser); //получаем пользователя из состояния
  return (
    <AppHeaderUI userName={user ? user.name : undefined} /> //передаем имя пользователя
  );
};
