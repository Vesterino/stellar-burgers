import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredients-slice';
import constructorOrderSlice from './slices/constructorOrder-slice';
import feedSlice from './slices/feed-slice';
import userSlice from './slices/user-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  constructorOrder: constructorOrderSlice,
  feed: feedSlice,
  user: userSlice
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
