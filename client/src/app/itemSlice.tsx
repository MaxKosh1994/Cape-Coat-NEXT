import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id: number;
  name: string;
  article: string;
  description: string;
  model_params: string;
  characteristics: string;
  price: number;
  new_price: number;
  in_stock: boolean;
  bestseller: boolean;
  collection_id: number;
  material_id: number;
  category_id: number;

  Photos: Photo[];
}
interface Photo {
  id: number;
  photo: string;
  item_id: number;
  createdAt: string;
  updatedAt: string;
}
export interface Material {
  id: number;
  name: string;
  photo: string;
  category_id: number;
}

export interface ItemState {
  item: Item;
  materials: Material[];
}

const initialState: ItemState = {
  item: {
    id: 0,
    name: '',
    article: '',
    description: '',
    model_params: '',
    characteristics: '',
    price: 0,
    new_price: 0,
    in_stock: false,
    bestseller: false,
    collection_id: 0,
    material_id: 0,
    category_id: 0,
    Photos: [],
  },
  materials: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<Item>) => {
      state.item = action.payload;
    },
    setMaterials: (state, action: PayloadAction<Material[]>) => {
      state.materials = action.payload;
    },
  },
});

export const { setItem, setMaterials } = itemSlice.actions;
export default itemSlice.reducer;
