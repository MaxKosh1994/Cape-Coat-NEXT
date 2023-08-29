import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import sessionSlice from './sessionSlice';
import CategorySlice, { stateType } from './CategorySlice';
import favouriteSlice, { FavouriteState } from './favouriteSlice';
import itemSlice, { ItemState } from './itemSlice';
import cartSlice from './cartSlice';
import { ICartState } from './types/cartTypes';
import { ISessionState } from './types/sessionTypes';

// interface RootState {
//   sessionSlice: ISessionState;
//   CategorySlice: stateType;
//   favouriteSlice: FavouriteState;
//   itemSlice: ItemState;
//   cartSlice: ICartState;
// }

export const store = configureStore({
  reducer: {
    sessionSlice: sessionSlice,
    CategorySlice: CategorySlice,
    favouriteSlice: favouriteSlice,
    itemSlice: itemSlice,
    cartSlice: cartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
