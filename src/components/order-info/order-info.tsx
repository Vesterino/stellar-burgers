import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useSelector } from '../../services/store';
import { useLocation, useParams } from 'react-router-dom';
import { getUserOrders } from '../../services/slices/user-slice';
import { getFeed } from '../../services/slices/feed-slice';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { number } = useParams();
  const items = useSelector((state) => state.ingredients.items);
  const feedOrders = useSelector((state) => state.feed.orders);
  const userOrders = useSelector((state) => state.user.orders);

  const isProfileOrder = location.pathname.includes('/profile');
  const orders = isProfileOrder ? userOrders : feedOrders;

  useEffect(() => {
    if (isProfileOrder) {
      dispatch(getUserOrders());
    } else {
      dispatch(getFeed());
    }
  }, [isProfileOrder, dispatch]);

  const orderData = orders.find((order) => String(order.number) === number);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !items.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = items.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, items]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
