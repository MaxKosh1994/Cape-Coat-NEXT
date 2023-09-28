import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemMaterial, ICartState, ISingleItem } from './types/cartTypes';

const initialState: ICartState = {
  cartItems: [],
};

const rtkSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    getCartItems(state, action: PayloadAction<ISingleItem[]>) {
      state.cartItems = action.payload;
    },
    delCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (el) => el.id !== +action.payload
      );
    },
    emptyCart(state) {
      state.cartItems = [];
    },
    addCartItem(state, action: PayloadAction<ISingleItem>) {
      state.cartItems = [...state.cartItems, action.payload];
    },
    delItemInCart(state, action: PayloadAction<[]>) {
      state.cartItems = action.payload;
    },
  },
});

export default rtkSlice.reducer;
export const {
  getCartItems,
  delCartItem,
  addCartItem,
  emptyCart,
  delItemInCart,
} = rtkSlice.actions;
