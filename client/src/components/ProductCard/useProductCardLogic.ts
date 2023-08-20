import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { toggleFavorite, toggleCart } from '../../app/CategorySlice';
import {
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
} from './thunkProduct';
import { fetchFavouritesData } from '../../app/thunkActionsFavourite';
import { getCartItemsThunk } from '../../app/thunkActionsCart';
import { addCartItem } from '../../app/cartSlice';
import { removeItem, setLikedStatus } from '../../app/favouriteSlice';
import { RootState } from '../../app/store';

const useProductCardLogic = (
  id: number,
  article: string,
  photo: string,
  name: string,
  price: number,
  initialIsFavorite: boolean,
  initialIsCart: boolean,
  newPrice?: number
) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isCart, setIsCart] = useState(initialIsCart);
  const [favCard, setFavCard] = useState();

  const { user } = useSelector((state: RootState) => state.sessionSlice);

  const favoriteHandler = async () => {
    setIsFavorite(!isFavorite);
    dispatch(toggleFavorite(id));
    try {
      const favoriteData = {
        id,
        article,
        photo,
        name,
        newPrice,
        price,
        isFavorite: !isFavorite,
      };
      const favoriteAction = isFavorite ? removeFromFavorites : addToFavorites;
      const favorite = await favoriteAction(favoriteData);
      setFavCard(favorite);
      dispatch(fetchFavouritesData(favorite));
      dispatch(setLikedStatus(!isFavorite));
    } catch (err) {
      console.log(err);
    }
  };

  const cartHandler = async () => {
    setIsCart((prevIsCart) => !prevIsCart);
    dispatch(toggleCart(id));
    try {
      if (!user) {
        // navigate('/signin');
        return;
      }

      const cartData = {
        id,
        article,
        photo,
        name,
        newPrice,
        price,
        isFavorite,
        isCart: !isCart,
      };

      if (!isCart) {
        const inCart = await addToCart(cartData);
        const itemInCart = inCart[0];
        setIsCart(itemInCart);
        dispatch(addCartItem(inCart));
      } else {
        const delCart = await removeFromCart(cartData);
        dispatch(removeItem(delCart));
        await dispatch(getCartItemsThunk(user));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        if (!user) {
          return;
        }
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'cart/cartInCat',
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const allItemInCart = await response.json();
          const isProductInCart = allItemInCart.includes(id);
          setIsCart(isProductInCart);
        }
        dispatch(toggleCart(id));
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return;
        }
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'favorite',
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const favorites = await response.json();
          const isProductFavorite = favorites.includes(id);
          setIsFavorite(isProductFavorite);
        }
        dispatch(toggleFavorite(id));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return {
    isFavorite,
    isCart,
    favoriteHandler,
    cartHandler,
  };
};

export default useProductCardLogic;