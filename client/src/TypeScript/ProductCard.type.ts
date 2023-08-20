export interface IProductCard {
  id: number
  article: string
  photo: string
  name: string
  price: number
  newPrice?: number
  isFavorite: boolean
  isCart: boolean
}