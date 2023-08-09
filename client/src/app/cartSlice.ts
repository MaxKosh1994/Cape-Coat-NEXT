import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const rtkSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    getCartItems(state, action) {
      state.cartItems = action.payload;
    },
    delCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (el) => el.id !== action.payload
      );
    },
    addCartItem(state, action) {
      state.cartItems = [...state.cartItems, action.payload];
    },
  },
});

export default rtkSlice.reducer;
export const { getCartItems, delCartItem, addCartItem } = rtkSlice.actions;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Item } from './itemSlice';

// interface ICartItem extends Item {
//   Carts: [];
// }

// export interface ICartItemsState {
//   cartItems: ICartItem[] | [];
// }

// const initialState: ICartItemsState = {
//   cartItems: [],
// };

// const rtkSlice = createSlice({
//   name: 'cartSlice',
//   initialState,
//   reducers: {
//     getCartItems(state, action: PayloadAction<ICartItemsState>) {
//       state.cartItems = action.payload;
//     },
//     delCartItem(state, action: PayloadAction<number>) {
//       state.cartItems = state.cartItems.filter(
//         (el) => el.id !== action.payload
//       );
//     },
//     addCartItem(state, action: PayloadAction<ICartItem>) {
//       state.cartItems = [...state.cartItems, action.payload];
//     },
//   },
// });

// export default rtkSlice.reducer;
// export const { getCartItems, delCartItem, addCartItem } = rtkSlice.actions;
