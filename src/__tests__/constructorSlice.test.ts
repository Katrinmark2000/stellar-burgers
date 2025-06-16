
import constructorBurgerSliceReducer, {
  addBunAndIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  initialState
} from '../services/slices/constructor/slice'; // укажите правильный путь
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

describe('constructorBurgerSlice reducers', () => {
  test('добавляет ингредиент (не булку)', () => {
    const ingredient: TConstructorIngredient = {
        id: '1',
        _id: '2',
        name: 'Котлета',
        type: 'main',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 150,
        price: 150,
        image: '',
        image_large: '',
        image_mobile: ''
    };
    const action = addBunAndIngredient(ingredient);
    const newState = constructorBurgerSliceReducer(initialState, action);
    expect(newState.constructorItems.ingredients[0].name).toEqual(ingredient.name);
})

    test('добавляет булку', () => {
    const bun: TConstructorIngredient = {
        id: '3',
        _id: '4',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 15,
        calories: 150,
        price: 100,
        image: '',
        image_large: '',
        image_mobile: ''
    };
    const action = addBunAndIngredient(bun);
    const newState = constructorBurgerSliceReducer(initialState, action);
    expect(newState.constructorItems.bun?._id).toBe(bun._id);
})

test('удаляет ингредиент по id', () => {
    // Исходное состояние с несколькими ингредиентами
    const initialIngredients: TConstructorIngredient[] = [
      {
        id: '1',
        _id: '2',
        name: 'Котлета',
        type: 'main',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 150,
        price: 150,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '3',
        _id: '4',
        name: 'Лук',
        type: 'main',
        proteins: 2,
        fat: 0,
        carbohydrates: 3,
        calories: 20,
        price: 20,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
  
    // Устанавливаем начальное состояние с этими ингредиентами
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [...initialIngredients]
      }
    };
  
    // Создаём экшен для удаления ингредиента с id '1'
    const deleteAction = deleteIngredient({
    id: '1',
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 150,
    price: 150,
    image: '',
    image_large: '',
    image_mobile: ''
});;
  
    // Вызываем редьюсер
    const newState = constructorBurgerSliceReducer(stateWithIngredients, deleteAction);
  
    // Проверяем, что ингредиент с _id '2' удалён
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]._id).toBe('4');
  });
 
  describe('Перемещение ингредиентов', () => {
    const initialIngredients = [
        {
            id: '1',
            _id: '2',
            name: 'Котлета',
            type: 'main',
            proteins: 10,
            fat: 10,
            carbohydrates: 10,
            calories: 150,
            price: 150,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            id: '3',
            _id: '4',
            name: 'Лук',
            type: 'main',
            proteins: 2,
            fat: 0,
            carbohydrates: 3,
            calories: 20,
            price: 20,
            image: '',
            image_large: '',
            image_mobile: ''
          }
      ];
      
      const initialTestState = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [...initialIngredients],
        },
      };

      test('поднимает ингредиент вверх', () => {
        const action = { type: 'moveIngredientUp', payload: 2 }; // третий элемент
        const newState = constructorBurgerSliceReducer(initialTestState, action);
        expect(newState.constructorItems.ingredients[1].id).toBe('3'); // третий поднялся на вторую пози
      });
      
      test('не поднимает первый элемент вверх', () => {
        const action = { type: 'moveIngredientUp', payload: 0 }; // первый элемент
        const newState = constructorBurgerSliceReducer(initialTestState, action);
        expect(newState.constructorItems.ingredients).toEqual(initialIngredients); // ничего не меняется
      });
  })
})
