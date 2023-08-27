export interface ItemPhoto {
  createdAt: string;
  id: number;
  item_id: number;
  photo: string;
  updatedAt: string;
}

export interface CartItem {
  added: null | boolean;
  bust: null | string;
  buttons: null | string;
  cart_id: number;
  createdAt: string;
  height: null | number;
  hips: null | number;
  item_id: number;
  length: null | number;
  lining: null | string;
  loops: null | boolean;
  saddle: null | string;
  sleeve: null | number;
  updatedAt: string;
  waist: null | number;
  user_id: number;
}

export interface ISingleItem {
  Carts: CartItem[];
  Photos: ItemPhoto[];
  article: string;
  bestseller: boolean;
  category_id: number;
  characteristics: string;
  collection_id: number;
  createdAt: string;
  description: string;
  id: number;
  in_stock: boolean;
  material_id: number;
  model_params: string;
  name: string;
  new_price: number;
  price: number;
  updatedAt: string;
}

export interface ICartState {
  cartItems: ISingleItem[];
}
