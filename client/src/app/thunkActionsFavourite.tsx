import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "./store"
import { useSelector } from "react-redux"
import { Item, ItemState, setItem, setMaterials } from "./itemSlice"
import {
  FavouriteItem,
  setFavourites,
  setFavoriteItemList,
} from "./favouriteSlice"
import { IItem } from "../components/accountComp/Orders/Orders"

interface IFetchItemData {
  id: number
  name: string
  description: string
  model_sizes: string
  care_instructions: string
  characteristics: string
  price: number
  color: string
  in_stock: boolean
  collection_id: number
  category_id: number
}

interface IFetchFavouritesData {
  isLiked: boolean
  favourites: FavouriteItem[]
}

export const fetchItemData = createAsyncThunk(
  "item/fetchItemData",
  async (id: number, { dispatch }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}item/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (res.ok) {
        const data: ItemState = await res.json()
        dispatch(setItem(data.item))
        dispatch(setMaterials(data.materials))
      }
    } catch (error) {
      console.log(error)
    }
  },
)

export const fetchFavouritesData = createAsyncThunk(
  "item/fetchFavouritesData",
  async (id: number | undefined = undefined, { dispatch, getState }) => {
    try {
      const { user } = getState().sessionSlice
      if (!user) {
        return
      }

      const res = await fetch(
        `${import.meta.env.VITE_URL}item/favourites/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      )

      if (res.ok) {
        const data: IFetchFavouritesData = await res.json()

        dispatch(setFavourites(data.favourites))
      }
    } catch (error) {
      console.log(error)
    }
  },
)

export const fetchAllFavorites = createAsyncThunk(
  "favorites/fetchAllFavorites",
  async (_, { dispatch }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}item/allFavorites`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (res.ok) {
        const data: IItem[] = await res.json()
        dispatch(setFavoriteItemList(data))
      }
    } catch (error) {
      console.log(error)
    }
  },
)
