import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
// import ProductCard from '../../ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useAppDispatch } from '../../../app/hooks';
import {
  fetchAllFavorites,
  fetchFavouritesData,
} from '../../../app/thunkActionsFavourite';
import ProductCard from '@/components/ProductCard/ProductCard';
import { addToFavorites } from '@/components/ProductCard/thunkProduct';
import { toggleFavorite } from '@/app/CategorySlice';

export default function Favorites() {
  let itemData = useSelector(
    (state: RootState) => state.favouriteSlice.favoriteItemList
  );
  const { user } = useSelector((state: RootState) => state.sessionSlice);

  const dispatch = useAppDispatch();
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    dispatch(fetchAllFavorites());
  }, []);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem('favorites')) || [];

    const fetchData = async () => {
      const fetchedItems = [];

      for (const id of favoritesFromStorage) {
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_URL + 'item/' + id,
            {
              credentials: 'include',
            }
          );
          if (response.status === 200) {
            let itemData = await response.json();

            fetchedItems.push(itemData);
          } else if (response.status === 404) {
            console.log('Товар не найден');
          }
        } catch (err) {
          console.log(err);
        }
      }

      setFavoriteItems(fetchedItems);
    };

    fetchData();
  }, []);

  if (!user) {
    itemData = [];
  }

  console.log('itemData', itemData);
  const renderProductCards =
    itemData && Array.isArray(itemData)
      ? itemData.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            material_name={item.Material.name}
            article={item.article}
            photo={item.Photos[0].photo}
            name={item.name}
            price={item.price}
            newPrice={item.new_price}
            isFavorite={item.isFavorite}
            isCart={item.isCart}
          />
        ))
      : null;

  const renderProductCardsLocal =
    favoriteItems && Array.isArray(favoriteItems)
      ? favoriteItems.map((item) => (
          <ProductCard
            key={item.item.id}
            id={item.item.id}
            material_name={item.item.Material.name}
            article={item.item.article}
            photo={item.item.Photos[0].photo}
            name={item.item.name}
            price={item.item.price}
            newPrice={item.item.new_price}
            isFavorite={item.item.isFavorite}
            isCart={item.isCart}
          />
        ))
      : null;

  return (
    <>
      {itemData?.length > 0 ? (
        <div className={styles.ContainerOneCard}>
          <div className={styles.ProductCardsContainer}>
            {renderProductCards}
          </div>
        </div>
      ) : favoriteItems?.length > 0 ? (
        <div className={styles.ContainerOneCard}>
          <div className={styles.ProductCardsContainer}>
            {renderProductCardsLocal}
          </div>
        </div>
      ) : (
        <div className={styles.infoContainer}>
          <p className={styles.infoP}>У вас пока нет товаров в избранном</p>
        </div>
      )}
    </>
  );
}
