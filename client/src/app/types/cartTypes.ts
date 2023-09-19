export interface ItemPhoto {
  createdAt: string;
  id: number;
  item_id: number;
  photo: string;
  updatedAt: string;
}

export interface CartItem {
  added?: null | boolean;
  bust?: null | string;
  buttons?: null | string;
  cart_id: number;
  createdAt?: string;
  height?: null | string;
  hips?: null | string;
  item_id?: number;
  length?: null | string;
  lining?: null | string;
  loops?: null | boolean;
  saddle?: null | string;
  sleeve?: null | string;
  updatedAt?: string;
  waist?: null | string;
  user_id?: number;
  selected_material?: null | string;
}

export interface ICart {
  id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  CartItem: CartItem;
}

export interface CartItemMaterial {
  selected_material?: null | string;
}

export interface MaterialItem {
  id: number;
  name: string;
  photo: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISingleItem {
  Carts: ICart[];
  Photos: ItemPhoto[];
  Material: MaterialItem;
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
  selected_material?: string;
  model_params: string;
  name: string;
  new_price: number;
  price: number;
  updatedAt: string;
}

export interface ICartState {
  cartItems: ISingleItem[];
}

export interface ILocalStorageCartItems {
  id: number;
  material_name?: string;
  in_stock?: boolean;
}

export interface ILocalStorageCartItem {
  id: number;
  material_name: string;
  in_stock: boolean;
  height: string;
  length: string;
  sleeve: string;
  bust: string;
  waist: string;
  hips: string;
  saddle: string;
  loops: boolean;
  buttons: string;
  lining: string;
}
