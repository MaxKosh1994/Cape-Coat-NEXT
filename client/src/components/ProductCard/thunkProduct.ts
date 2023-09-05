import { IProductCard } from '@/TypeScript/ProductCard.type';
import axios from 'axios';
import { da } from 'date-fns/locale';

export const addToFavorites = async (data: IProductCard) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}favorite/add`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const removeFromFavorites = async (data: IProductCard) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}favorite/del`,
      {
        data,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (data: IProductCard) => {
  try {
    // console.log('data', data);
    // console.log('cartData', cartData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}cart/item/add`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const addToCartItem = async (data: IProductCard) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}cart/item/add`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (data: IProductCard) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}cart/item/del`,
      {
        data,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
