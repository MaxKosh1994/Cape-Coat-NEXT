import { IUser } from '@/components/accComp/orders/types';
import React from 'react';
import { oneUserCompProps } from './types';
import styles from './OneUserComp.module.css';
import OrderComp from '@/components/accComp/orderComp/OrderComp';

export default function OneUserComp({ user }: oneUserCompProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <p>ФИО:</p>
        <p>EMAIL:</p>
        <p>TELEGRAM:</p>
        <p>Адрес:</p>
        <p>Номер телефона:</p>
        <p>Дата регистрации:</p>
        <p>Всего заказов:</p>
      </div>

      <div className={styles.userInfoContainer}>
        <p>{user?.full_name}</p>
        <p>{user?.email}</p>
        <p>{user?.telegram}</p>
        <p>{user?.address}</p>
        <p>{user?.phone}</p>
        <p>{user?.createdAt.toString()}</p>
        <p>{user?.Orders.length}</p>
      </div>

      {/* <div className={styles.ordersContainer}>
        {user?.Orders.map((order) => (
          <OrderComp key={order.id} order={order} />
        ))}
      </div> */}
    </div>
  );
}
