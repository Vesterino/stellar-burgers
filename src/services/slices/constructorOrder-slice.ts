import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

export type ConstructorOrderState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  selectedIngredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
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
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      const index = state.selectedIngredients.findIndex(
        (ingredient) => ingredient._id === action.payload
      );

      if (index !== -1) {
        state.selectedIngredients.splice(index, 1);
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        toIndex >= 0 &&
        toIndex < state.selectedIngredients.length &&
        fromIndex !== toIndex
      ) {
        [
          state.selectedIngredients[fromIndex],
          state.selectedIngredients[toIndex]
        ] = [
          state.selectedIngredients[toIndex],
          state.selectedIngredients[fromIndex]
        ];
      }
    },
    clearOrderData: (state) => {
      state.orderModalData = null;
    },
    clearConstructorItems: (state) => {
      state.bun = null;
      state.selectedIngredients = [];
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

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearOrderData,
  clearConstructorItems
} = constructorOrderSlice.actions;

export default constructorOrderSlice.reducer;
