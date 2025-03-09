import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type ConstructorOrderState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  selectedIngredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: any;
};

const initialState: ConstructorOrderState = {
  bun: null,
  ingredients: [],
  selectedIngredients: [],
  orderRequest: false,
  orderModalData: null
};

export const fetchConstructorOrder = createAsyncThunk(
  'constructorOrder/fetchConstructorOrder',
  async (ingredientsIds: string[]) => {
    const response = await orderBurgerApi(ingredientsIds);
    return response.order;
  }
);

const constructorOrderSlice = createSlice({
  name: 'constructorOrder',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConstructorOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(fetchConstructorOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchConstructorOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const { addBun, addIngredient, removeIngredient } =
  constructorOrderSlice.actions;

export default constructorOrderSlice.reducer;
