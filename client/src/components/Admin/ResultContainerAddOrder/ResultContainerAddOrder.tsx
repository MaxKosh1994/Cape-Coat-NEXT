import React from 'react';
import styles from './ResultContainerAddOrder.module.css';

export default function ResultContainerAddOrder({
  personalData,
  cartTotal,
  addressString,
  commentsInput,
  urgentMaking,
}) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.infoLeftDiv}>
          <p className={styles.infoMainP}>Имя заказчика:</p>
          <p className={styles.infoMainP}>Эл.почта:</p>
          <p className={styles.infoMainP}>Номер телефона:</p>
          <p className={styles.infoMainP}>Telegram/insta:</p>
        </div>

        <div className={styles.infoRightDiv}>
          <p className={styles.infoMainP}>{personalData.name}</p>
          <p className={styles.infoMainP}>{personalData.email}</p>
          <p className={styles.infoMainP}>{personalData.number}</p>
          <p className={styles.infoMainP}>{personalData.telegram_instagram}</p>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoOrderBody}>
          <p className={styles.infoMainP}>Стоимость заказа: {cartTotal}</p>
          <p className={styles.infoMainP}>
            Cрочность: {urgentMaking ? 'да' : 'нет'}
          </p>
          <div>Адрес доставки: {addressString}</div>
          <div>Комментарии к заказу: {commentsInput}</div>
        </div>
      </div>
    </div>
  );
}
