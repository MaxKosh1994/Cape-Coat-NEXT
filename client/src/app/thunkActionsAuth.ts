import axios from 'axios';
import {
  startSession,
  endSession,
  handleError,
  checkSession,
} from './sessionSlice';
import { setFavourites } from './favouriteSlice';
import { fetchFavouritesData } from './thunkActionsFavourite';
import { checkCartItemThunk, getCartItemsThunk } from './thunkActionsCart';
import { getCartItems } from './cartSlice';

export const signUpUserThunk = (inputsData) => async (dispatch) => {
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
    dispatch(handleError(err));
    return err;
  }
};

export const signInUserThunk = (inputsData) => async (dispatch) => {
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
    console.log('data', res.data.email);
    dispatch(startSession(res.data));
    dispatch(fetchFavouritesData());
    dispatch(checkCartItemThunk());

    return res.data;
  } catch (err) {
    dispatch(handleError(err));
    return err;
  }
};

export const signOutUserThunk = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}auth/logout`, {
      withCredentials: true,
    });

    dispatch(endSession());
    dispatch(setFavourites([]));
    dispatch(getCartItems([]));
  } catch (err) {
    console.log(err);
  }
};

export const isUserLoginThunk = () => async (dispatch) => {
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
  } catch (error) {
    console.log(error);
  }
};
