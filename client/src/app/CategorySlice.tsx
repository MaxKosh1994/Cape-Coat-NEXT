import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { stateType, userType } from "../types"


export interface IPhoto {
  photo: string; // Поле для фотографии товара
  // Дополнительные свойства фотографии, если есть
}

export interface ICategory {
  id: number;
  // article: string;
  // photo: IPhoto | undefined;
  // name: string;
  // price: number;
  // categoryName: string;
  isFavorite: boolean;
  isCart: boolean;
}

export interface IItem extends ICategory{
  id: number;
  article: string;
  photo: IPhoto | undefined;
  name: string;
  price: number;
  categoryName: string;
  isFavorite: boolean;
  isCart: boolean;

}
// export interface IFavorite {
//   id: number
//   isFavorite: boolean
// }

export type stateType = {
  category: ICategory[];
  itemInCategory: IItem[]
  favorites: IItem[];
  itemsInCart: IItem[];
};

const initialState: stateType = {
  category: [],
  itemInCategory: [],
  favorites: [],
  itemsInCart: [],
};

const rtkSlice = createSlice({
  name: 'CategorySlice',
  initialState,
  reducers: {
    category(state, action: PayloadAction<ICategory>) 
    {
      console.log( state.category),
      state.category.push(action.payload);
      // console.log(action.payload)
    },
    itemInCategory(state, action:PayloadAction<IItem>) {
      state.itemInCategory.push(action.payload);

      // console.log('state', state)
      // console.log('action.payload', action.payload)
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.categoryItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const isFavorite = state.categoryItems[index].isFavorite;
        state.categoryItems[index].isFavorite = !isFavorite;

        if (isFavorite) {
          state.favorites = state.favorites.filter((favId) => favId !== id);
        } else {
          state.favorites.push(id);
        }
      }
    },
    toggleCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.categoryItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const currentIsCart = state.categoryItems[index].isCart;
        state.categoryItems[index].isCart = !currentIsCart;

        if (currentIsCart) {
          state.itemsInCart = state.itemsInCart.filter(
            (cartId) => cartId !== id
          );
        } else {
          state.itemsInCart.push(id);
        }
      }
    },
    categoryClear(state) {
      state.categoryItems = [];
    },
  },
});

export default rtkSlice.reducer;
export const { category, itemInCategory, toggleFavorite, categoryClear, toggleCart } =
  rtkSlice.actions;
