import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrdersUser,
  getOrdersUserLoadingStatus
} from '../../services/slices/order/slice';
import { ordersUser } from '../../services/slices/order/actions';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersUser); //получаем заказы
  const loading = useSelector(getOrdersUserLoadingStatus); //получаем статус загрузки

  //загрузка заказов при монтировании компонента
  useEffect(() => {
    dispatch(ordersUser()); //вызываем экшен для получения заказов
  }, []);

  if (!loading) {
    return <ProfileOrdersUI orders={orders} />;
  }
};
