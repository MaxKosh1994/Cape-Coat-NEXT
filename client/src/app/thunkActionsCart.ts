import axios from 'axios';
import { addCartItem, delCartItem, getCartItems } from './cartSlice';

import { RootState } from './store';
import { useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

export const getCartItemsThunk = () => async (dispatch, getState) => {
  try {
    const { user } = getState().sessionSlice;
    // console.log('user in thunk', user);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}cart/${user}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    dispatch(getCartItems(res.data));
    return res.data;
  } catch (err) {
    // dispatch(handleError(err))
    console.log(err);
    return err;
  }
};

export const delCartItemThunk = (data) => async (dispatch) => {
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
        credentials: 'include',
      }
    );
    dispatch(delCartItem(res));
    return res.data;
  } catch (err) {
    // dispatch(handleError(err))
    console.log(err);
    return err;
  }
};
export const addCartItemsThunk = (id) => async (dispatch) => {
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
    dispatch(getCartItems());
    return res.data;
  } catch (err) {
    // dispatch(handleError(err))
    console.log(err);
    return err;
  }
};

export const checkCartItemThunk =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
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
    } catch (err) {
      console.log(err);
      return err;
    }
  };
