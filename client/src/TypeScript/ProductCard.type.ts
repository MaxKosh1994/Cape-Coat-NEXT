export interface IProductCard {
  id: number;
  material_name: string;
  article: string | number;
  photo: string;
  name: string;
  price: number;
  newPrice?: number;
  isFavorite: boolean;
  isCart: boolean;
  isItemInFavoritesState?: boolean;
  urlName?: string;
}

export interface ILocalStorageCartItems {
  id: number;
  material_name: string | undefined;
}

export interface ILocalStorageFavotiteItems {
  id: number;
}

