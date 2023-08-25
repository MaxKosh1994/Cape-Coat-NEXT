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
  // article: string,
  // photo: string,
  // name: string,
  // price: number,
  initialIsFavorite: boolean,
  initialIsCart: boolean,
  newPrice?: number
) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isCart, setIsCart] = useState(initialIsCart);
  const [favCard, setFavCard] = useState();

  const { user } = useSelector((state: RootState) => state.sessionSlice);
  // console.log(user);

  const favoriteHandler = async () => {
    // if (isItemInFavorites) {
    //   return;
    // }
    setIsFavorite(!isFavorite);
    dispatch(toggleFavorite(id));
    // const localStorageData = localStorage.getItem('favorites');

    if (!user) {
      const favoritesFromStorage =
        JSON.parse(localStorage.getItem('favorites')) || [];
      // console.log(favoritesFromStorage)
      if (isFavorite) {
        console.log(isFavorite);
        const updatedFavorites = favoritesFromStorage.filter(
          (favId) => favId !== id
        );
 
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        const updatedFavorites = [...favoritesFromStorage, id];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
      dispatch(setLikedStatus(!isFavorite));
    } else {
      try {
        const favoriteData = {
          id,
          // article,
          // photo,
          // name,
          // newPrice,
          // price,
          isFavorite: !isFavorite,
        };

        const favoritesFromStorage =
          JSON.parse(localStorage.getItem('favorites')) || [];

        if (favoritesFromStorage.length > 0) {
          // Отправить на сервер каждый товар из localStorage
          await Promise.all(
            favoritesFromStorage.map(async (favId) => {
              const favData = { ...favoriteData, id: favId };
              return addToFavorites(favData); // Ваша функция addToFavorites
            })
          );

          // Удалить данные из localStorage после успешной отправки
          localStorage.removeItem('favorites');

          // Запросить обновленные данные об избранных с сервера
          dispatch(fetchFavouritesData());
          dispatch(setLikedStatus(true)); // Обновить статус "избранности"
        } else {
          const favoriteAction = isFavorite
            ? removeFromFavorites
            : addToFavorites;
          const favorite = await favoriteAction(favoriteData);
          setFavCard(favorite);
          dispatch(fetchFavouritesData(favorite));
          dispatch(setLikedStatus(!isFavorite));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const cartHandler = async () => {
    setIsCart(!isCart);
    dispatch(toggleCart(id));

    if (!user) {
      const cartItemsFromStorage =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      if (!isCart) {
        const updatedCartItems = [...cartItemsFromStorage, id];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      } else {
        const updatedCartItems = cartItemsFromStorage.filter(
          (cartId) => cartId !== id
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } else {
      try {
        const cartData = {
          id,
          // article,
          // photo,
          // name,
          // newPrice,
          // price,
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
    }
  };
  useEffect(() => {
    // if(user) {
    //   console.log('hello')
    //   localStorage.clear()
    // }
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
        const response = await fetch(process.env.NEXT_PUBLIC_URL + 'favorite', {
          method: 'GET',
          credentials: 'include',
        });
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
