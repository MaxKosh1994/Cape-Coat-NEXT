import Head from 'next/head';
import React from 'react';
import styles from './NavAdminComp.module.css';
import { Button } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function NavAdminComp() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Cape&Coat | Кабинет администратора</title>
        <meta name='title' content='Cape and Coat' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainDiv}>
        <div className={styles.routesDiv}>
          <NextLink href='/admin/cat-col-mat'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/cat-col-mat' ? styles.active : ''
              }`}
            >
              Контент
            </Button>
          </NextLink>

          <NextLink href='/admin/cat-col-mat'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/cat-col-mat' ? styles.active : ''
              }`}
            >
              Все товары
            </Button>
          </NextLink>

          <NextLink href='/admin/cat-col-mat'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/cat-col-mat' ? styles.active : ''
              }`}
            >
              Категории/Коллекции/Материалы
            </Button>
          </NextLink>

          <NextLink href='/admin/orders'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/orders' ? styles.active : ''
              }`}
            >
              Заказы
            </Button>
          </NextLink>

          <NextLink href='/admin/users'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/users' ? styles.active : ''
              }`}
            >
              Клиенты
            </Button>
          </NextLink>

          <NextLink href='/admin/tasks'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/tasks' ? styles.active : ''
              }`}
            >
              Задания
            </Button>
          </NextLink>
        </div>
      </div>
    </>
  );
}
