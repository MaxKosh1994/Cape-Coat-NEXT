import NavFAQComp from '@/components/navFAQComp/NavFAQComp';
import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/measurementsFAQ.module.css';

export default function deliveryFAQ() {
  return (
    <>
      <NavFAQComp />
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <Typography className={styles.Header} variant="h4" component="h1">
            Доставка
          </Typography>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.info}>текст</div>

          <div className={styles.info}>текст</div>

          <div className={styles.info}>текст</div>

          <div className={styles.info}>текст</div>
        </div>
      </div>
    </>
  );
}
