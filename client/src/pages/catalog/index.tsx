import React, { useEffect, useState } from 'react';
import CategoryList from '../../components/catalog/CategoryList/categoryList';
import styles from '../../styles/Catalog.module.css';
import { Typography } from '@mui/material';
import Head from 'next/head';
import { ICategory } from '@/TypeScript/categoryList.type';

export default function Catalog() {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response = await fetch(
          process.env.NEXT_PUBLIC_URL + 'catalog/categories',
          {
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const allCategs = await response.json();
          setAllCategories(allCategs);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cape&Coat | Каталог</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography>
        <span className={styles.headerText}>
          <strong>Каталог</strong>
        </span>
      </Typography>
      <div className={styles.catalogueContainer}>
        {allCategories.map((cat: ICategory) => (
          <CategoryList key={cat.id} categoryInfo={cat} />
        ))}
      </div>
    </>
  );
}
