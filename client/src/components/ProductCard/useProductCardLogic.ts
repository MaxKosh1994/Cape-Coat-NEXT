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
import {
  removeItem,
  setFavourites,
  setLikedStatus,
} from '../../app/favouriteSlice';
import { RootState } from '../../app/store';

const useProductCardLogic = (
  id: number,
  material_name: string,
  article: string,
  photo: string,
  name: string,
  price: number,
  initialIsFavorite: boolean,
  initialIsCart: boolean,
  newPrice?: number,
  isItemInFavoritesState?: boolean,
  urlName?: string
) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isCart, setIsCart] = useState(initialIsCart);
  const [favCard, setFavCard] = useState();

  const { user } = useSelector((state: RootState) => state.sessionSlice);

  const favoriteHandler = async () => {
    dispatch(toggleFavorite(id));

    if (!user) {
      setIsFavorite(false);
      const favoritesFromStorage =
        JSON.parse(localStorage.getItem('favorites')) || [];
        console.log('logic',favoritesFromStorage )

      const isItemInFavorites = favoritesFromStorage.includes(id);
      if (isItemInFavorites) {
        const updatedFavorites = favoritesFromStorage.filter(
          (favId) => favId !== id
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        const updatedFavorites = [...favoritesFromStorage, id];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        //TODO ставится сердечко в навбаре, а как его убрать?

        // dispatch(setFavourites(updatedFavorites));
      }
      dispatch(setLikedStatus(!isFavorite));
    } else {
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
        const favoriteAction = isFavorite
          ? removeFromFavorites
          : addToFavorites;
        const favorite = await favoriteAction(favoriteData);

        setFavCard(favorite);
        dispatch(fetchFavouritesData(favorite));
        dispatch(setLikedStatus(!isFavorite));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const cartHandler = async () => {
    setIsCart(!isCart);
    dispatch(toggleCart(id));

    if (!user) {
      setIsCart(false);
      const cartItemsFromStorage =
        JSON.parse(localStorage.getItem('cartItems')) || [];

      const isItemInCart = cartItemsFromStorage.find((item) => item.id === id);

      if (isItemInCart) {
        const updatedCartItems = cartItemsFromStorage.filter(
          (item) => item.id !== id
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      } else {
        const updatedCartItems = [
          ...cartItemsFromStorage,
          { id, material_name },
        ];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } else {
      try {
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
    }
  };
  useEffect(() => {
    if (user) {
      const cartFromStorage =
        JSON.parse(localStorage.getItem('cartItems')) || [];

      if (cartFromStorage.length > 0) {
        Promise.all(
          cartFromStorage.map(async (cartId) => {
            const cartData = {
              id: cartId,
            };
            return addToCart(cartData);
          })
        )
          .then(() => {
            // Удалить данные из localStorage после успешной отправки
            localStorage.removeItem('cartItems');

            // Запросить обновленные данные об избранных с сервера
            dispatch(getCartItemsThunk());
          })
          .catch((error) => {
            console.error('Error while adding item in cart:', error);
          });
      }
      try {
        (async function (): Promise<void> {
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
    } else {
      setIsCart(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const favoritesFromStorage =
        JSON.parse(localStorage.getItem('favorites')) || [];

      if (favoritesFromStorage.length > 0) {
        Promise.all(
          favoritesFromStorage.map(async (favId) => {
            const favoriteData = {
              id: favId,
            };
            return addToFavorites(favoriteData);
          })
        )
          .then(() => {
            // Удалить данные из localStorage после успешной отправки
            localStorage.removeItem('favorites');

            // Запросить обновленные данные об избранных с сервера
            dispatch(fetchFavouritesData());
          })
          .catch((error) => {
            console.error('Error while adding favorites:', error);
          });
      }
      const fetchData = async () => {
        try {
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
    } else {
      setIsFavorite(false);
    }
  }, []);

  return {
    isFavorite,
    isCart,
    favoriteHandler,
    cartHandler,
    urlName,
  };
};

export default useProductCardLogic;
