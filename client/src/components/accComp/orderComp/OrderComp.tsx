import React from 'react';
import { IOrderCompProps } from './types';
import styles from './OrderComp.module.css';
import SearchItemCard from '@/components/SearchItemCard/SearchItemCard';

export default function OrderComp({ order }: IOrderCompProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.leftSideContainer}>
          <h4>Номер заказа: {order.id}</h4>
        </div>
        <div className={styles.rightSideContainer}>
          <h4>{order.status}</h4>
        </div>
      </div>

      <div className={styles.bodyContainer}>
        <div className={styles.leftBodyContainer}>
          <div className={styles.headerComp}>
            <h4>
              <span className={styles.boldDarkText}>Дата: </span>
              {`  ${order.createdAt
                .toString()
                .slice(0, 10)
                .replace(/-/g, '.')}`}
            </h4>
          </div>

          <div className={styles.headerComp}>
            <h4>
              <span className={styles.boldDarkText}>Сумма заказа: </span>{' '}
              {order.total.toLocaleString().replace(/,\s?/g, ' ')} ₽
            </h4>
          </div>

          <div className={styles.headerComp}>
            <h4>
              <span className={styles.boldDarkText}>Адрес: </span>{' '}
              {order.address}
            </h4>
          </div>
        </div>
        <div className={styles.rightBodyContainer}>
          {order.Items?.map((item) => (
            <SearchItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className={styles.footerContainer}>
        <h4>Комментарии: {order.comments}</h4>
      </div>
    </div>
  );
}
