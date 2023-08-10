import React, { useEffect } from 'react';
import styles from './Favorites.module.css';
// import ProductCard from '../../ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useAppDispatch } from '../../../app/hooks';
import { fetchAllFavorites } from '../../../app/thunkActionsFavourite';

export default function Favorites() {
  const itemData = useSelector(
    (state: RootState) => state.favouriteSlice.favoriteItemList
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllFavorites());
  }, [dispatch]);

  return (
    <>
      {itemData?.length > 0 ? (
        <div className={styles.itemsContainer}>
          {itemData?.map((item) => (
            // <ProductCard
            //   key={item.id}
            //   id={item.id}
            //   photo={item.Photos[0].photo}
            //   name={item.name}
            //   isFavorite={true}
            //   isCart={false}
            //   color={item.color}
            //   price={item.price}
            //   width={window.innerWidth < 830 ? '300px' : '400px'}
            //   height={window.innerWidth < 830 ? '415px' : '540рх'}
            // />
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      ) : (
        <p>У вас пока нет товаров в избранном</p>
      )}
    </>
  );
}
