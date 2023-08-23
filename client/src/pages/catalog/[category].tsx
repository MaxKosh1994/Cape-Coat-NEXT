import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/styles/Category.module.css';

import { RootState } from '../../app/store';
import ProductCard from '../../components/ProductCard/ProductCard';
import { category, categoryClear } from '../../app/CategorySlice';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useLocation } from 'react-router-dom';
import Link from 'next/link';

export default function Category() {
  const [catName, setCatName] = useState('');
  const location = useRouter().query.id;
  const dispatch = useDispatch();

  const card = useSelector(
    (state: RootState) => state.CategorySlice.categoryItems
  );

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + `category/${location}`,
          {
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          dispatch(categoryClear());

          result.forEach((el) => {
            el.Items.forEach((item) => {
              const photos = item.Photos; // Массив фотографий
              const firstPhoto = photos[0]?.photo || ''; // Получение первой фотографии или пустой строки, если фотография отсутствует

              dispatch(
                category({
                  id: item.id,
                  article: item.article,
                  photo: firstPhoto,
                  name: item.name,
                  price: item.price,
                  categoryName: item.categoryName,
                  isFavorite: false,
                  isCart: false,
                })
              );
            });
            setCatName(el.name);
          });
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [location]);

  const renderProductCards = card.map((item) => (
    <ProductCard
      key={item.id}
      id={item.id}
      article={item.article}
      photo={item.photo}
      name={item.name}
      price={item.price}
      isFavorite={item.isFavorite}
      isCart={item.isCart}
    />
  ));

  return (
    <>
      <Head>
        <title>Cape&Coat | {catName}</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.ContainerOneCard}>
        <h3 className={styles.Header}>{catName}</h3>
        <div className={styles.ProductCardsContainer}>{renderProductCards}</div>
      </div>
    </>
  );
}
