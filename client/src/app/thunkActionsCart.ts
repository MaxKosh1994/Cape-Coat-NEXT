import axios, { AxiosError } from 'axios';
import { addCartItem, delCartItem, emptyCart, getCartItems } from './cartSlice';

import { AppThunk, RootState } from './store';
import { Dispatch } from '@reduxjs/toolkit';
import { handleError } from './sessionSlice';
import { ILocalStorageCartItems } from './types/cartTypes';

export const getCartItemsThunk = (): AppThunk => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}cart/`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await dispatch(getCartItems(res.data));
    return data.payload;
  } catch (err: AxiosError | any) {
    const { response } = err;
    dispatch(handleError(response?.data));
  }
};

export const getCartItemsByIdThunk =
  (itemIds: ILocalStorageCartItems[]): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}item/itemsById`,
        itemIds,
        {
          method: 'POST',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const resp = await dispatch(getCartItems(res.data));
      return resp.payload;
    } catch (err: AxiosError | any) {
      const { response } = err;
      dispatch(handleError(response?.data));
    }
  };

export const delCartItemThunk =
  (data: { itemId: number; user: string }): AppThunk =>
  async (dispatch: Dispatch) => {
    const { itemId, user } = data;
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}cart/item/${itemId}/${user}`,
        {
          method: 'DELETE',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        dispatch(delCartItem(itemId));
      }
      return res.data;
    } catch (err: AxiosError | any) {
      const { response } = err;
      dispatch(handleError(response?.data));
    }
  };

export const emptyCartThunk = (): AppThunk => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}cart/emptyCart`,
      {
        method: 'DELETE',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch(emptyCart());
    return res.status;
  } catch (err: AxiosError | any) {
    const { response } = err;
    dispatch(handleError(response?.data));
  }
};

export const addCartItemsThunk =
  (id: number): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}cart/item/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(getCartItems(res.data.newCartItem));
      return res.data;
    } catch (err: AxiosError | any) {
      const { response } = err;
      dispatch(handleError(response?.data));
    }
  };

export const checkCartItemThunk =
  (): AppThunk => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { user } = getState().sessionSlice;

      if (!user) {
        return;
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}cart/item/${user}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(getCartItems(res.data.cartItem));
    } catch (err: AxiosError | any) {
      const { response } = err;
      dispatch(handleError(response?.data));
    }
  };
