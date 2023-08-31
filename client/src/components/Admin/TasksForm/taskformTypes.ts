export interface ITaskData {
  taskNum: number;
  date: string;
  itemCategory: string;
  itemMaterial: string;
  itemArticle: string;
  size?: string;
  sizeComments?: string;
  length: string;
  sleeve?: string;
  shlitsa?: string;
  loops?: string;
  delay?: string;
  buttons?: string;
  lining?: string;
  straps?: string;
  height?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  saddle?: string;
  belt?: string;
  accs?: string;
  zipper?: string;
  comments?: string;
}

export interface IItemData {
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
  createdAt: string;
  updatedAt: string;
  OrderItem: IOrderItemInItemData;
  Material: IMaterialInItemData;
}

export interface IOrderItemInItemData {
  order_id: number;
  item_id: number;
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
  createdAt: string;
  updatedAt: string;
}

export interface IMaterialInItemData {
  id: number;
  name: string;
  photo: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskInfo {
  id: number;
  text?: string;
  deadline?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}
