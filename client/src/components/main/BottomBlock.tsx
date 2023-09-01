import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';

export default function BottomBlock() {
  const [itemsForMain, setItemsForMain] = useState([]);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isLaptop = useMediaQuery('(min-width:851px) and (max-width:1200px)');

  useEffect(() => {
    getItemsForMain();
  }, []);

  const getItemsForMain = async () => {
    try {
      const allItems = await fetch(
        `${process.env.NEXT_PUBLIC_URL}item/allItems`,
        {
          credentials: 'include',
        }
      );
      const response = await allItems.json();
      console.log(response);
      if (allItems.status === 200) {
        let items;
        const filterStock = response.filter((item) => item.in_stock === false);
        setItemsForMain(filterStock);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('itemsForMain', itemsForMain[0].Category.urlName);

  return (
    <>
      <div className={styles.cardsContainer}>
        {isMobile ? (
          <>
            {itemsForMain.slice(6, 8).map((item) => (
              <ProductCard
                key={item.id}
                material_name={item.Material.name}
                id={item.id}
                article={item.article}
                photo={item.Photos[0].photo}
                name={item.name}
                price={item.price}
                isFavorite={item.isFavorite}
                isCart={item.isCart}
                urlName={item.Category ? item.Category.urlName : ''}
              />
            ))}
          </>
        ) : isLaptop ? (
          <>
            {itemsForMain.slice(4, 7).map((item) => (
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
                urlName={item.Category ? item.Category.urlName : ''}
              />
            ))}
          </>
        ) : (
          <>
            {itemsForMain.slice(4, 8).map((item) => (
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
                urlName={item.Category ? item.Category.urlName : ''}
              />
            ))}
          </>
        )}
      </div>
      <Link href='catalog/all-items'>
        <button className={styles.allBtn}>Смотреть все товары</button>
      </Link>
    </>
  );
}
