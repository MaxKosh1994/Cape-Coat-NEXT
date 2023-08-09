import axios from "axios"
import { addCartItem, delCartItem, getCartItems } from "./cartSlice"

import { RootState } from "./store"
import { useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"

export const getCartItemsThunk = (user) => async (dispatch, getState) => {
  try {
    const { user } = getState().sessionSlice
    const res = await axios.get(`${import.meta.env.VITE_URL}cart/${user}`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5174",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    dispatch(getCartItems(res.data))
    return res.data
  } catch (err) {
    // dispatch(handleError(err))
    console.log(err)
    return err
  }
}

export const delCartItemThunk = (data) => async (dispatch) => {
  const { itemId, user } = data
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_URL}cart/item/${itemId}/${user}`,
      {
        method: "DELETE",
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5174",
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    )
    dispatch(delCartItem(res))
    return res.data
  } catch (err) {
    // dispatch(handleError(err))
    console.log(err)
    return err
  }
}
export const addCartItemsThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}cart/item/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    dispatch(getCartItems(res.data.newCartItem))
    dispatch(getCartItems())
    return res.data
  } catch (err) {
    // dispatch(handleError(err))
    console.log(err)
    return err
  }
}

export const checkCartItemThunk =
  (id: number | undefined = undefined) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { user } = getState().sessionSlice
      if (!user) {
        return
      }

      const res = await axios.get(
        `${import.meta.env.VITE_URL}cart/item/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      dispatch(getCartItems(res.data.cartItem))
    } catch (err) {
      console.log(err)
      return err
    }
  }
