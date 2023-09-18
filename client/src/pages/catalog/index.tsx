import React from 'react';
import CategoryList from '../../components/catalog/CategoryList/categoryList';
import styles from '../../styles/Catalog.module.css';
import { Typography } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';

interface Category {
  id: number;
  photo: string;
  name: string;
  urlName: string;
}

interface CatalogProps {
  allCategories: Category[];
}

function Catalog({ allCategories }: CatalogProps) {
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
        {allCategories.map((cat) => (
          <CategoryList
            key={cat.id}
            id={cat.id}
            imageUrl={`${process.env.NEXT_PUBLIC_CATEGORY_URL}${cat.photo}`}
            category={cat.name}
            urlName={cat.urlName}
          />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + 'catalog/categories',
      {
        credentials: 'include',
      }
    );
    if (response.status === 200) {
      const allCategories: Category[] = await response.json();
      return {
        props: {
          allCategories,
        },
      };
    } else {
      return {
        props: {
          allCategories: [],
        },
      };
    }
  } catch (err) {
    console.error(err);
    return {
      props: {
        allCategories: [],
      },
    };
  }
}

export default Catalog;
