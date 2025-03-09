import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  const ingredientData = ingredients.find((item) => item._id === ingredientId);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
