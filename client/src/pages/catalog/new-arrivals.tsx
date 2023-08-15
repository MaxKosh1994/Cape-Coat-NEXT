import React, { useState, useEffect } from 'react';
// import ProductCard from '../ProductCard/ProductCard';
import styles from '../../styles/NewArrivals.module.css';
import { Typography } from '@mui/material';
import Head from 'next/head';

export default function NewArrivalsPage() {
  const [newArrivalsItems, setNewArrivalsItems] = useState([]);
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/new-arrivals'
        );
        if (response.status === 200) {
          const collection = await response.json();
          setNewArrivalsItems(collection);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cape&Coat | Новые поступления</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography>
        <p className={styles.arrivalsText}>
          <strong>Новинки</strong>
        </p>
      </Typography>
      <div className={styles.arrivalsContainer}>
        {/* {newArrivalsItems.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            photo={item.Photos[0].photo}
            name={item.name}
            color={item.color}
            price={item.price}
            isFavorite={false}
            isCart={false}
            width={window.innerWidth < 830 ? '300px' : '400px'}
            height={window.innerWidth < 500 ? '415px' : '540px'}
          />
        ))} */}
      </div>
    </>
  );
}
