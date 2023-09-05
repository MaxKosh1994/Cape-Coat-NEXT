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
  const itemData = useSelector(
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
            const itemData = await response.json();

            console.log('resp itemData', itemData);

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
            isFavorite={item.isFavorite}
            isCart={item.isCart}
          />
        ))
      : null;

  console.log('favoriteItems', favoriteItems);

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
            isFavorite={item.item.isFavorite}
            isCart={item.isCart}
          />
        ))
      : null;

  console.log('favorite', favoriteItems[0]?.item?.isFavorite);

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
