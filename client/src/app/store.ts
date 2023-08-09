import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import sessionSlice from "./sessionSlice"
import CategorySlice from "./CategorySlice"
import favouriteSlice from "./favouriteSlice"
import itemSlice from "./itemSlice"
import cartSlice from "./cartSlice"

export const store = configureStore({
  reducer: {
    sessionSlice: sessionSlice,
    CategorySlice: CategorySlice,
    favouriteSlice: favouriteSlice,
    itemSlice: itemSlice,
    cartSlice: cartSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
