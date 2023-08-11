export interface IItem {
  id: number;
  category_id: number;
  collection_id: number;
  name: string;
  care_instructions: string;
  characteristics: string;
  description: string;
  color: string;
  model_sizes: string;
  photo: string;
  price: number;
  in_stock: boolean;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

export interface IOrder {
  id: number;
  user_id: number;
  total: number;
  status: string;
  address: string;
  Items: Array<IItem>;
  createdAt: Date;
  updatedAt: Date;
}

export type DataResponse = {
  info: string;
  orders: IOrder[];
};
