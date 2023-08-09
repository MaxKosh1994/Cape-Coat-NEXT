import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from '../styles/Account.module.css';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Account() {
  //! Модалка на выход
  //   const [open, setOpen] = useState<boolean>(false); //* onClick={handleOpen} *//
  //   const handleOpen = () => setOpen(true);

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => setWindowWidth(window.innerWidth);

  return (
    <div className={styles.mainDiv}>
      {windowWidth > 550 && (
        <div className={styles.headerDiv}>
          <h1>Мой аккаунт</h1>
          <h4 className={styles.headersText}>
            <LogoutIcon />
            Выйти из аккаунта
          </h4>
        </div>
      )}
      {windowWidth < 550 && <></>}
      {windowWidth > 500 && (
        <div className={styles.routesDiv}>
          <Link href='/account/favorites'>
            <Button className={styles.button}>Избранное</Button>
          </Link>
          <Link href='/account/measurements'>
            <Button className={styles.button} type='button'>
              Мои параметры
            </Button>
          </Link>
          <Link href='/account/profile'>
            <Button className={styles.button} type='button'>
              Мои данные
            </Button>
          </Link>
          <Link href='/account/orders'>
            <Button className={styles.button} type='button'>
              Заказы
            </Button>
          </Link>
        </div>
      )}
      {windowWidth < 550 && (
        <div className={styles.mobileDiv}>
          <h4 className={styles.headersText}>
            {' '}
            <LogoutIcon />
            Выйти из аккаунта
          </h4>
          <div className={styles.routesDiv}>
            <Link href='/account/favorites'>
              <Button className={styles.button}>Избранное</Button>
            </Link>
            <Link href='/account/measurements'>
              <Button className={styles.button} type='button'>
                Параметры
              </Button>
            </Link>
            <Link href='/account/profile'>
              <Button className={styles.button} type='button'>
                Данные
              </Button>
            </Link>
            <Link href='/account/orders'>
              <Button className={styles.button} type='button'>
                Заказы
              </Button>
            </Link>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
