import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/slices/user/actions';
import { getIngredients } from '../../services/slices/ingredients/actions';
import { useDispatch } from '../../services/store';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backgroundLocation = location.state && location.state.background;

  //закрытие модалки, возвращаем на главную
  const onClose = () => {
    navigate(-1);
  };

  //диспатчим ингридиенты и проверяем авторизацию
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />

        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />

        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />

        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />

        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />

        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />

        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth
                component={
                  <Modal title='Детали заказа' onClose={onClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
