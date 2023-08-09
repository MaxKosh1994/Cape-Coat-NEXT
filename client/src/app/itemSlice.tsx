import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Item {
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
  Photos: []
}
export interface Material {
  id: number
  photo: string
  category_id: number
}

export interface ItemState {
  item: Item
  materials: Material[]
}

const initialState: ItemState = {
  item: {
    id: 0,
    name: "",
    description: "",
    model_sizes: "",
    care_instructions: "",
    characteristics: "",
    price: 0,
    color: "",
    in_stock: false,
    collection_id: 0,
    category_id: 0,
    Photos: [],
  },
  materials: [],
}

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<Item>) => {
      state.item = action.payload
    },
    setMaterials: (state, action: PayloadAction<Material[]>) => {
      state.materials = action.payload
    },
  },
})

export const { setItem, setMaterials } = itemSlice.actions
export default itemSlice.reducer
