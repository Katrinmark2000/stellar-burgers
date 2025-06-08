import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/user/actions';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    deleteCookie('accessToken');
    dispatch(logoutUser());
  };
  
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
