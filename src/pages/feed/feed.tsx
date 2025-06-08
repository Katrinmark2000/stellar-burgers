import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrdersFeed } from '../../services/slices/feed/slice';
import { useDispatch, useSelector } from '../../services/store';
import { feedsAll } from '../../services/slices/feed/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getOrdersFeed); //получаем заказы

  useEffect(() => {
    //загружаем заказы
    dispatch(feedsAll());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(feedsAll())} />;
};
