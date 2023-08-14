import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import styles from '../styles/Account.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Favorites from '@/components/accComp/favorites/Favorites';
import Profile from '@/components/accComp/profile/Profile';
import Orders from '@/components/accComp/orders/Orders';
import SureModal from '@/components/accComp/sureModal/SureModal';

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
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
        <h1>Мой аккаунт</h1>
        <h4 onClick={handleOpen} className={styles.headersText}>
          <LogoutIcon />
          Выйти из аккаунта
        </h4>
      </div>
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
          type='button'
        >
          Личные данные
        </Button>
        <Button
          onClick={() => setSelectedComponent('orders')}
          className={styles.button}
          type='button'
        >
          Заказы
        </Button>
        <SureModal open={open} setOpen={setOpen} />
      </div>
      {renderComponent()}
    </div>
  );
}
