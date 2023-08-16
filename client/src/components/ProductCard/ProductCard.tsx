import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';

import { IconButton } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './ProductCard.module.css';

import { IProductCard } from '@/TypeScript/ProductCard.type';

import { RootState } from '../../app/store';
import { fetchFavouritesData } from '../../app/thunkActionsFavourite';
import { getCartItemsThunk } from '../../app/thunkActionsCart';
import { toggleCart, toggleFavorite } from '../../app/CategorySlice';
import { addCartItem } from '../../app/cartSlice';
import { removeItem, setLikedStatus } from '../../app/favouriteSlice';

export default function ProductCard({
  id,
  article,
  photo,
  name,
  price,
  isFavorite: initialIsFavorite,
  isCart: initialIsCart,
  newPrice,
}: IProductCard) {
  const dispatch = useAppDispatch();

  const [favCard, setFavCard] = useState();

  // const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isCart, setIsCart] = useState(initialIsCart);

  const favorites = useSelector(
    (state: RootState) => state.CategorySlice.favorites
  );
  const itemsInCart = useSelector(
    (state: RootState) => state.CategorySlice.itemsInCart
  );

  // const favorites2 = useSelector(
  //   (state: RootState) => state.favouriteSlice.favourites
  // );
  const { user } = useSelector((state: RootState) => state.sessionSlice);

  const itemCardHandler = async (e): Promise<void> => {
    const targer = e.target;
    if (!targer) return;
    const parent = targer.closest('.conteiner-item').id;

    //TODO поменять в навигации categoryName на :categoryName
    // navigate(`/catalog/categoryName/${parent}`, { state: parent });
  };

  //! логика лайка

  const favoriteHandler = async (): Promise<void> => {
    setIsFavorite(!isFavorite);
    dispatch(toggleFavorite(id));
    try {
      // if (!user) {
      //   // navigate('/signin');
      //   return;
      // }
      if (isFavorite === false) {
        const response = await fetch(process.env.VITE_URL + 'favorite/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            id,
            article,
            photo,
            name,
            newPrice,
            price,
            isFavorite,
          }),
        });
        if (response.status === 200) {
          const favorite = await response.json();
          setFavCard(favorite);
          dispatch(fetchFavouritesData(favorite));

          // Обновление счетчика лайков
          dispatch(setLikedStatus(true));
        }
      } else {
        const response = await fetch(process.env.VITE_URL + 'favorite/del', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            id,
            article,
            photo,
            name,
            newPrice,
            price,
            isFavorite,
          }),
        });
        if (response.status === 200) {
          const favorite = await response.json();
          setFavCard(favorite);
          dispatch(removeItem(favorite.item_id));
          dispatch(setLikedStatus(false));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //! логика корзины

  const cartHandler = async (): Promise<void> => {
    setIsCart((prevIsCart) => !prevIsCart);
    dispatch(toggleCart(id));
    try {
      // if (!user) {
      //   navigate('/signin');
      //   return;
      // }
      if (isCart === false) {
        const response = await fetch(process.env.VITE_URL + 'cart/item/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            id,
            article,
            photo,
            name,
            newPrice,
            price,
            isFavorite,
            isCart,
          }),
        });
        if (response.status === 200) {
          const inCart = await response.json();
          const itemInCart = inCart[0];
          setIsCart(itemInCart);
          dispatch(addCartItem(inCart));
        }
      } else {
        const response = await fetch(process.env.VITE_URL + 'cart/item/del', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            id,
            article,
            photo,
            name,
            newPrice,
            price,
            isFavorite,
            isCart,
          }),
        });
        if (response.status === 200) {
          const delCart = await response.json();

          dispatch(removeItem(delCart));
          const updatedCartItems = await dispatch(getCartItemsThunk(user));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //! логика отображения компонентов на странице
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        if (!user) {
          return;
        }
        const response = await fetch(process.env.VITE_URL + 'cart/cartInCat', {
          method: 'GET',
          credentials: 'include',
        });
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
        const response = await fetch(process.env.VITE_URL + 'favorite', {
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

  return (
    <>
      <div
        className={styles.Card}
        key={id}
        // id={id}
      >
        <span className={styles.CardMedia}>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${photo}`}
            alt="Product Image"
            onClick={itemCardHandler}
            className={styles.Image}
          />
        </span>
        {/* <CardMedia
          component="img"
          alt="Product Image"
          image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${photo}`}
          className="card-media"
          onClick={itemCardHandler}
        /> */}
        <h1 className={styles.NameCard}>{name}</h1>
        {/* <div className={styles.InfoCard}> */}
        <div className={styles.CardContent}>
          <h3 className={styles.Price}>
            Цена: {price?.toLocaleString().replace(/,\s?/g, ' ')} ₽
          </h3>

          <div className={styles.Icons}>
            <IconButton 
            aria-label="Add to favorites" onClick={favoriteHandler}>
              {isFavorite ? <FavoriteIcon className={styles.IconImage} /> : <FavoriteBorderOutlinedIcon className={styles.IconImage} />}
            </IconButton>
            <IconButton onClick={cartHandler} aria-label="Add to cart">
              {isCart ? <AddTaskIcon className={styles.IconImage} /> : <AddShoppingCartIcon className={styles.IconImage} />}
            </IconButton>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
