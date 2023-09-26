import React from 'react';
import Head from 'next/head';
import styles from '../styles/collectionPage.module.css';
import LookBookContainer from '@/components/LookBook/LookBookContainer/LookBookContainer';
import { COLLECTION_ONE_DATA } from '@/components/LookBook/data';

export default function collection() {
  return (
    <>
      <Head>
        <title>Cape&Coat</title>
        <meta
          name='title'
          content='Cape and Coat - Индивидуальная одежда на заказ'
        />
        <meta
          name='description'
          content='Закажите у нас индивидуальную одежду по вашим меркам. Cape&Coat предлагает широкий выбор одежды по индивидуальным заказам.'
        />
        <meta
          name='keywords'
          content='заказ одежды, коллекция, lookBook, пошив одежды, в нижнем новгороде, пошив одежды рядом, на заказ, Cape&Coat, одежда по меркам, женская одежда на заказ, пошив на заказ для женщин, пошив платья, пошив платья на заказ, пошив пальто, пошив женских пальто, пошив костюма, пошив костюма на заказ, пошив женских костюмов, пошив брюк женских, пошив брюк, пошив юбок, пошив на заказ, пошив тренча, пошив шуб, пошив шуб на заказ, пошив искусственных шуб, индивидуальный пошив шубы, пошив женского пиджака, пошив пиджака, пошив одежды цена'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />

        <meta property='og:title' content='Cape&Coat - Одежда на заказ' />
        <meta
          property='og:description'
          content='Пошив одежды на заказ. Одежда по вашим меркам.'
        />

        <meta property='og:type' content='website' />
      </Head>
      <div className={styles.mainContainer}>
        {COLLECTION_ONE_DATA.map((el) => (
          <div key={el.id} className={styles.imageBlock}>
            <LookBookContainer content={el} />
          </div>
        ))}
      </div>
    </>
  );
}
