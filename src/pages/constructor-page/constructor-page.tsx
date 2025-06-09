import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { getIngredientsLoadingStatus } from '../../services/slices/ingredients/slice';
import { useSelector } from '../../services/store';
import { setOrderStatus } from '../../services/slices/constructor/slice';

export const ConstructorPage: FC = () => {
  const isLoading = useSelector(getIngredientsLoadingStatus); //отслеживаем статус загрузки
  const orderLoading = useSelector(setOrderStatus);

  if (orderLoading) {
    return <Preloader />;
  }

  return (
    <>
      {isLoading ? ( //если тру, то данные еще загружаются, если фолс, то все рендерится. Пока грузится, мы видим прелоадер
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
