import NavFAQComp from '@/components/navFAQComp/NavFAQComp';
import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/orderFAQ.module.css';
import Link from 'next/link';

export default function orderFAQ() {
  return (
    <>
      <NavFAQComp />
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <Typography className={styles.Header} variant='h4' component='h1'>
            Оформление заказа
          </Typography>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            Чтобы заказать пошив изделия по вашим параметрам выберите
            понравившуюся Вам модель и ткань изделия. Заказать пошив и снять
            мерки Вы можете дистанционно или у нас в студии.
          </div>

          <div className={styles.info}>
            Снимите необходимые мерки. Для этого можете воспользоваться услугами
            ателье или сделать это самостоятельно. Ознакомьтесь с{' '}
            <Link href='measurementsFAQ'>
              информацией по самостоятельному снятию мерок
            </Link>
            . Сделайте заказ на сайте. И ожидайте связи с менеджером для
            подтверждения заказа.
          </div>

          <div className={styles.info}>
            Срок пошива обычно занимает от 5 до 10 рабочих дней. Точные сроки
            пошива Вам уточнят при подтверждении заказа. Пошив осуществляется по
            частичной предоплате. Остальная часть суммы вносится по готовности
            изделия. Забрать готовую вещь Вы можете у нас в студии или оформив
            доставку. Подробнее о <Link href='deliveryFAQ'>доставке</Link> и
            <Link href='returnFAQ'>возврате</Link> .
          </div>

          <div className={styles.info}>
            Если у Вас остались вопросы Вы всегда можете проконсультироваться у
            нашего менеджера
          </div>
        </div>
      </div>
    </>
  );
}
