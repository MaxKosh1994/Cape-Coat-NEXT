import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/styles/Category.module.css';

import { RootState } from '../../app/store';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ICategory, category, categoryClear } from '../../app/CategorySlice';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Custom404 from '../404';

export default function Category() {
  const [catName, setCatName] = useState('');
  const nameOneCategory = useRouter().query.category;
  const dispatch = useDispatch();

  const card = useSelector(
    (state: RootState) => state.CategorySlice.categoryItems
  );

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + `category/${nameOneCategory}`,
          {
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          dispatch(categoryClear());

          result.items.forEach((item: ICategory) => {
            dispatch(
              category({
                id: item.id,
                article: item.article,
                photo: item.Photos[0]?.photo || '',
                name: item.name,
                price: item.price,
                categoryName: item.categoryName,
                isFavorite: false,
                isCart: false,
              })
            );
          });
          setCatName(result.catName);
        } 
        else if (response.status === 404) {
          const result = await response.json();
          console.log(result.message);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [nameOneCategory]);

  const renderProductCards = card.map((item: ICategory) => (
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
        {renderProductCards.length ? (
          <div className={styles.ProductCardsContainer}>
            {renderProductCards}
          </div>
        ) : (
          <Custom404 />
        )}
      </div>
    </>
  );
}
