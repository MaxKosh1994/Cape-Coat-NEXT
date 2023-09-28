export interface IItem {
  [x: string]: any;
  id: number;
  article: number;
  name: string;
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
  Photos: IPhoto[];
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
  isCart: boolean;
}

export interface IPhoto {
  photo: string;
}

export interface IOrder {
  id: number;
  user_id: number;
  total: number;
  status: string;
  address: string;
  comments: string;
  Items: Array<IItem>;
  createdAt: Date;
  updatedAt: Date;
}

export type DataResponse = {
  info: string;
  orders: IOrder[];
};

export interface IUser {
  id: number;
  email: string;
  password: string;
  phone: string;
  full_name: string;
  address: string;
  telegram: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
  Orders: IOrder[];
}

export type DataUsersResponse = {
  allUsers: IUser[];
};
