import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { useAppDispatch } from '../../services/store';
import {
  clearConstructorItems,
  clearOrderData,
  fetchConstructorOrder
} from '../../services/slices/constructorOrder-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    bun,
    selectedIngredients: ingredients,
    orderRequest,
    orderModalData
  } = useSelector((state) => state.constructorOrder);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }

    if (!bun || orderRequest) return;
    const ingredientsIds = [
      bun?._id,
      ...ingredients.filter((item) => item._id).map((item) => item._id)
    ];
    dispatch(fetchConstructorOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
    navigate('/');
    dispatch(clearConstructorItems());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
