import { ItemPhoto, MaterialItem } from '@/app/types/cartTypes';

export interface IBasePageItem {
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
  model_params: string;
  name: string;
  new_price: number;
  price: number;
  updatedAt: string;
  photo?: string;
  isFavorite: boolean;
  isCart: boolean;
}
