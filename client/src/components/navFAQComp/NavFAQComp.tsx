import Head from 'next/head';
import React from 'react';
import styles from './NavFAQComp.module.css';
import { Button } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function NavFAQComp() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Cape&Coat | Профиль</title>
        <meta name='title' content='Cape and Coat' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainDiv}>
        <div className={styles.routesDiv}>
          <NextLink href='/FAQ/deliveryFAQ'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/FAQ/deliveryFAQ' ? styles.active : ''
              }`}
            >
              Как оформить доставку
            </Button>
          </NextLink>
          <NextLink href='/FAQ/returnFAQ'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/FAQ/returnFAQ' ? styles.active : ''
              }`}
            >
              Как сделать возврат
            </Button>
          </NextLink>
          <NextLink href='/FAQ/orderFAQ'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/FAQ/orderFAQ' ? styles.active : ''
              }`}
            >
              Как оформить заказ
            </Button>
          </NextLink>
          <NextLink href='/FAQ/measurementsFAQ'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/FAQ/measurementsFAQ' ? styles.active : ''
              }`}
            >
              Как снять мерки
            </Button>
          </NextLink>
        </div>
      </div>
    </>
  );
}
