import Head from 'next/head';
import React, { useState } from 'react';
import styles from './NavAdminComp.module.css';
import { Button } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import SureModal from '../accComp/sureModal/SureModal';

export default function NavAdminComp() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

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
          <NextLink href='/admin/promo'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/promo' ? styles.active : ''
              }`}
            >
              Промокоды
            </Button>
          </NextLink>

          <NextLink href='/admin/content'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/content' ? styles.active : ''
              }`}
            >
              Добавить контент
            </Button>
          </NextLink>

          <NextLink href='/admin/ordersHistory'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/ordersHistory' ? styles.active : ''
              }`}
            >
              История заказов
            </Button>
          </NextLink>

          <NextLink href='/admin/tasks'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/tasks' ? styles.active : ''
              }`}
            >
              Заказы в работе
            </Button>
          </NextLink>

          <NextLink href='/admin/newOrder'>
            <Button
              className={`${styles.button} ${
                router.pathname === '/admin/newOrder' ? styles.active : ''
              }`}
            >
              Создать заказ
            </Button>
          </NextLink>

          <NextLink href='#'>
            <Button
              onClick={handleOpen}
              className={styles.button}
              type='button'
            >
              <LogoutIcon />
              Выйти
            </Button>
          </NextLink>
        </div>
      </div>
      <SureModal open={open} setOpen={setOpen} />
    </>
  );
}
