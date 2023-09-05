import Favorites from '@/components/accComp/favorites/Favorites';
import Head from 'next/head';
import styles from '../styles/BasePage.module.css';

export default function FavsPage() {
  return (
    <>
      <Head>
        <title>Cape&Coat | Избранное</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className={styles.header}>Избранное</h3>
      <Favorites />
    </>
  );
}
