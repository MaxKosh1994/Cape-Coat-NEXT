import axios from 'axios';
import {
  startSession,
  endSession,
  handleError,
  checkSession,
} from './sessionSlice';
import { setFavourites } from './favouriteSlice';
import { fetchFavouritesData } from './thunkActionsFavourite';
import { getCartItemsThunk } from './thunkActionsCart';
import { getCartItems } from './cartSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { ISignInInputs, ISignUpInputs } from '@/TypeScript/authTypes';
import { AppThunk } from './store';

export const signUpUserThunk =
  (inputsData: ISignUpInputs): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}auth/register`,
        inputsData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      dispatch(startSession(res.data));
      return res.data;
    } catch (err) {
      const { response } = err;
      dispatch(handleError(response?.data));
    }
  };

export const signInUserThunk =
  (inputsData: ISignInInputs): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}auth/login`,
        inputsData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      dispatch(startSession(res.data));
      dispatch(fetchFavouritesData());
      dispatch(getCartItemsThunk());

      return res.data;
    } catch (err) {
      const { response } = err;
      dispatch(handleError(response?.data));
    }
  };

export const forgotPassThunk =
  (userEmail: { email: string }): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}auth/forgot-pass`,
        userEmail,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (err) {
      const { response } = err;
      dispatch(handleError(response?.data));
      return null;
    }
  };

export const resetPassThunk =
  (token: string | string[] | undefined, password: string): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const data = { token, password };
      console.log('sent');
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}auth/reset-pass`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (err) {
      const { response } = err;
      dispatch(handleError(response?.data));
    }
  };

export const signOutUserThunk = (): AppThunk => async (dispatch: Dispatch) => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}auth/logout`, {
      withCredentials: true,
    });

    dispatch(endSession());
    dispatch(setFavourites([]));
    dispatch(getCartItems([]));
  } catch (err) {
    const { response } = err;
    dispatch(handleError(response?.data));
  }
};

export const isUserLoginThunk = (): AppThunk => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/session`, {
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      const { isLogin, user, isAdmin } = data;

      if (isLogin) {
        dispatch(checkSession({ isLogin, user, isAdmin }));
      } else {
        dispatch(endSession());
      }
    }
  } catch (err) {
    const { response } = err;
    dispatch(handleError(response?.data));
  }
};
