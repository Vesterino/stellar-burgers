import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { fetchConstructorOrder } from '../../services/slices/constructorOrder-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients, orderRequest, orderModalData } = useSelector(
    (state: RootState) => state.constructorOrder
  );

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    // const ingredientsIds = [bun?._id, ...ingredients.map((item) => item._id)];
    // dispatch(fetchConstructorOrder(ingredientsIds));
  };
  const closeOrderModal = () => {};

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
