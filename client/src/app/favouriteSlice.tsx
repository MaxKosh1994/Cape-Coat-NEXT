import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IItem } from "../components/accountComp/Orders/Orders"

export interface FavouriteItem {
  user_id: number
  item_id: number
}
export interface FavouriteState {
  isLiked: boolean
  favourites: FavouriteItem[]
  favoriteItemList: IItem[]
}

const initialState: FavouriteState = {
  isLiked: false,
  favourites: [],
  favoriteItemList: [],
}

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<FavouriteItem>) => {
      state.favourites.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<number | number[]>) => {
      const idsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      state.favourites = state.favourites.filter(
        (item) => !idsToRemove.includes(item.item_id),
      )
    },
    setFavourites: (state, action: PayloadAction<FavouriteItem[]>) => {
      state.favourites = action.payload
    },
    setLikedStatus: (state, action: PayloadAction<boolean>) => {
      state.isLiked = action.payload
    },
    setFavoriteItemList: (state, action: PayloadAction<IItem[]>) => {
      state.favoriteItemList = action.payload
    },
  },
})

export const {
  addItem,
  removeItem,
  setFavourites,
  setLikedStatus,
  setFavoriteItemList,
} = favouriteSlice.actions
export default favouriteSlice.reducer
