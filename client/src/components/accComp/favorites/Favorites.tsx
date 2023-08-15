import React, { useEffect } from 'react';
import styles from './Favorites.module.css';
// import ProductCard from '../../ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useAppDispatch } from '../../../app/hooks';
import { fetchAllFavorites } from '../../../app/thunkActionsFavourite';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Favorites() {
  const itemData = useSelector(
    (state: RootState) => state.favouriteSlice.favoriteItemList
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllFavorites());
  }, [dispatch]);

  console.log(itemData);

  return (
    <>
      {itemData?.length > 0 ? (
        <div className={styles.itemsContainer}>
          {itemData?.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              article={item.article}
              photo={item.Photos[0].photo}
              name={item.name}
              price={item.price}
              isFavorite={item.isFavorite}
              isCart={item.isCart}
            />
          ))}
        </div>
      ) : (
        <div className={styles.infoContainer}>
          <p>У вас пока нет товаров в избранном</p>
        </div>
      )}
    </>
  );
}
