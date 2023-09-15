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
import {
  getCartItemsByIdThunk,
  getCartItemsThunk,
} from '../../app/thunkActionsCart';
import {
  addCartItem,
  delCartItem,
  delItemInCart,
  getCartItems,
} from '../../app/cartSlice';
import {
  addItem,
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
  urlName?: string
) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isCart, setIsCart] = useState(initialIsCart);
  const [favCard, setFavCard] = useState();

  const { user } = useSelector((state: RootState) => state.sessionSlice);

  const favoriteHandler = async () => {
    if (!user) {
      const favoritesFromStorage =
        JSON.parse(localStorage.getItem('favorites')) || [];

      const isItemInFavorites = favoritesFromStorage.includes(id);

      if (isItemInFavorites) {
        const updatedFavorites = favoritesFromStorage.filter(
          (favId) => favId !== id
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
        await dispatch(setFavourites(updatedFavorites));
      } else {
        const updatedFavorites = [...favoritesFromStorage, id];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
        await dispatch(setFavourites(updatedFavorites));
      }
    } else {
      setIsFavorite(!isFavorite);
      try {
        const favoriteData = {
          id,
          material_name,
          article,
          photo,
          name,
          newPrice,
          price,
          isFavorite: !isFavorite,
          isCart,
        };
        const favoriteAction = isFavorite
          ? removeFromFavorites
          : addToFavorites;
        const favorite = await favoriteAction(favoriteData);
        setFavCard(favorite);
        await dispatch(fetchFavouritesData(favorite));
        await dispatch(setLikedStatus(!isFavorite));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const cartHandler = async () => {
    if (!user) {
      const cartItemsFromStorage =
        JSON.parse(localStorage.getItem('cartItems')) || [];

      const isItemInCart = cartItemsFromStorage.find((item) => item.id === id);

      if (isItemInCart) {
        const updatedCartItems = cartItemsFromStorage.filter(
          (item) => item.id !== id
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        await dispatch(getCartItemsByIdThunk(updatedCartItems));
        setIsCart(!isCart);
      } else {
        const updatedCartItems = [
          ...cartItemsFromStorage,
          { id, material_name, in_stock: newPrice ? true : false },
        ];
        console.log(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setIsCart(!isCart);
        console.log(updatedCartItems);
        await dispatch(getCartItemsByIdThunk(updatedCartItems));
      }
    } else {
      setIsCart(!isCart);
      try {
        const cartData = {
          id,
          material_name,
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
          const itemInCart = inCart[1];
          setIsCart(itemInCart);
          await dispatch(getCartItemsThunk());
          // dispatch(addCartItem(inCart[0]));
        } else {
          const delCart = await removeFromCart(cartData);
          await dispatch(getCartItemsThunk());
          setIsCart(false);
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
              id: cartId.id,
              material_name: cartId.material_name,
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
      const fetchData = async () => {
        try {
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
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    } else {
      const cartFromStorage = JSON.parse(
        localStorage.getItem('cartItems') || '[]'
      );
      async function fetchUpdCartItems(cartFromStorage) {
        try {
          await dispatch(getCartItemsByIdThunk(cartFromStorage));
        } catch (error) {
          console.error('Error while fetching cart items:', error);
        }
      }
      fetchUpdCartItems(cartFromStorage);
      const isItemInCart = cartFromStorage.some((element) => element.id === id);
      setIsCart(isItemInCart);
    }
  }, [user]);

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
      const favoritesFromStorage = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );
      dispatch(setFavourites(favoritesFromStorage));
      const isItemInFavorites = favoritesFromStorage.includes(id);
      setIsFavorite(isItemInFavorites);
    }
  }, [user]);

  return {
    isFavorite,
    isCart,
    favoriteHandler,
    cartHandler,
    urlName,
  };
};

export default useProductCardLogic;
