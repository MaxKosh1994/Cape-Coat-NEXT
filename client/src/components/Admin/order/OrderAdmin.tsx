import React from 'react';
import styles from './OrderAdmin.module.css';
import { IOrderAdminCompProps } from './types';

export default function OrderAdmin({ order }: IOrderAdminCompProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.infoRowsBox}>
          <p>Имя:</p>
          <p>Email:</p>
          <p>Telegram:</p>
          <p>Телефон:</p>
        </div>
        <div className={styles.userInfoBox}>
          <p>{order.User.full_name}</p>
          <p>{order.User.email}</p>
          <p>{order.User.telegram}</p>
          <p>{order.User.phone}</p>
        </div>
      </div>
      <div className={styles.orderInfoContainer}></div>
      <div className={styles.itemInfoContainer}></div>
    </div>
  );
}
