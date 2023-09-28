import NavFAQComp from '@/components/navFAQComp/NavFAQComp';
import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/orderFAQ.module.css';

export default function deliveryFAQ() {
  return (
    <>
      <NavFAQComp />
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <Typography className={styles.Header} variant='h4' component='h1'>
            Доставка
          </Typography>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            Самостоятельно забрать заказ в Нижнем Новгороде можно в нашей студии
            на Ильинской 79.
          </div>

          <div className={styles.info}>
            Доставка по городу осуществляется курьерской службой Яндекс
            доставка.
          </div>

          <div className={styles.info}>
            Доставка по России осуществляется курьерской службой СДЕК. В
            отдаленные регионы возможна доставка Почтой России.
          </div>

          <div className={styles.info}>
            Стоимость доставки оплачивается по тарифам службы доставки, ее можно
            уточнить при оформлении заказа у нашего менеджера.
          </div>
        </div>
      </div>
    </>
  );
}
