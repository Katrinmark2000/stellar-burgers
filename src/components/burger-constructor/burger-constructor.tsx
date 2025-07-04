import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  setOrderRequest,
  setOrderModalData,
  getConstructorItems,
  clearOrder,
  resetConstructor
} from '../../services/slices/constructor/slice';
import { getIsAuthChecked, getUser } from '../../services/slices/user/slice';
import { useNavigate } from 'react-router-dom';
import { orderCreate } from '../../services/slices/constructor/actions';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(setOrderRequest);
  const orderModalData = useSelector(setOrderModalData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!isAuthChecked || user === null) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter((id): id is string => !!id);

    dispatch(orderCreate(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
