import React from 'react';
import styles from '../styles/ThankYou.module.css';
import { Button } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Link from 'next/link';
import Router from 'next/router';

export default function thankYouPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <TaskAltIcon
          style={{
            marginRight: `30px`,
            marginTop: '5px',
            // width: '40px',
            fontSize: '40px',
            color: 'green',
          }}
        />
        <h1>Спасибо за заказ!</h1>
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.infoP}>Ваш заказ успешно создан!</p>
        <p className={styles.infoP}>
          Мы отправили вам на почту подверждение с номером заказа.
        </p>
        <p className={styles.infoP}>
          В ближайшее время с вами свяжется наш сотрудник для уточнения деталей.
        </p>
        <p className={styles.infoP}>
          Статус заказа вы можете отслеживать в вашем личном кабинете.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          variant='contained'
          color='primary'
          type='submit'
          onClick={() => Router.push('/')}
        >
          На главную
        </Button>

        <Button
          className={styles.button}
          variant='contained'
          color='primary'
          type='submit'
          onClick={() => Router.push('/account')}
        >
          Заказы
        </Button>
      </div>
    </div>
  );
}