import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import styles from '../styles/Account.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Favorites from '@/components/accComp/favorites/Favorites';
import Profile from '@/components/accComp/profile/Profile';
import Orders from '@/components/accComp/orders/Orders';
import SureModal from '@/components/accComp/sureModal/SureModal';
import Head from 'next/head';

export default function Account() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState('profile');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'favorites':
        return <Favorites />;
      case 'profile':
        return <Profile />;
      case 'orders':
        return <Orders />;
      default:
        return null;
    }
  };

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Head>
        <title>Cape&Coat | Профиль</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className={styles.mainDiv}>
        <div className={styles.routesDiv}>
          <Button
            onClick={() => setSelectedComponent('favorites')}
            className={styles.button}
          >
            Избранное
          </Button>
          <Button
            onClick={() => setSelectedComponent('profile')}
            className={styles.button}
            type="button"
          >
            Данные
          </Button>
          <Button
            onClick={() => setSelectedComponent('orders')}
            className={styles.button}
            type="button"
          >
            Заказы
          </Button>
          <Button onClick={handleOpen} className={styles.button} type="button">
            <LogoutIcon />
            Выйти
          </Button>
          <SureModal open={open} setOpen={setOpen} />
        </div>
        <div className={styles.elContainer}>{renderComponent()}</div>
      </div>
    </>
  );
}
