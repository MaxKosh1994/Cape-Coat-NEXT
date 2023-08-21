import Head from 'next/head';
import styles from '../../styles/BasePage.module.css';
import { Typography } from '@mui/material';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function BasePage({ pageName, itemsArr }) {
  return (
    <>
      <Head>
        <title>Cape&Coat | {pageName}</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography>
        <p className={styles.header}>
          <strong>{pageName}</strong>
        </p>
      </Typography>
      <div className={styles.pageContainer}>
        {itemsArr.map((item) => (
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
        ))}
      </div>
    </>
  );
}
