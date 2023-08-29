import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';
import { useSelector } from 'react-redux';
import { Item, ItemState, setItem, setMaterials } from './itemSlice';
import {
  FavouriteItem,
  setFavourites,
  setFavoriteItemList,
} from './favouriteSlice';
import { IItem } from '../components/accountComp/Orders/Orders';

interface IFetchItemData {
  id: number;
  name: string;
  description: string;
  model_sizes: string;
  care_instructions: string;
  characteristics: string;
  price: number;
  color: string;
  in_stock: boolean;
  collection_id: number;
  category_id: number;
}

interface IFetchFavouritesData {
  isLiked: boolean;
  favourites: FavouriteItem[];
}

export const fetchItemData = createAsyncThunk(
  'item/fetchItemData',
  async (item: string | string[], { dispatch }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}item/${item}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.ok) {
        const data: ItemState = await res.json();

        dispatch(setItem(data.item));
        dispatch(setMaterials(data.materials));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchFavouritesData =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { user } = getState().sessionSlice;
      if (!user) {
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}item/favourites/${user}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (res.ok) {
        const data: IFetchFavouritesData = await res.json();

        dispatch(setFavourites(data.favourites));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const fetchAllFavorites = createAsyncThunk(
  'favorites/fetchAllFavorites',
  async (_, { dispatch }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}item/allFavorites`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (res.ok) {
        const data: IItem[] = await res.json();
        dispatch(setFavoriteItemList(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchOneFavourite =
  (item: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}item/favourites/${item}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (res.ok) {
        const data = await res.json();

        dispatch(setFavourites(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
