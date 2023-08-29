import React from 'react';
import styles from './ResultContainerAddOrder.module.css';

export default function ResultContainerAddOrder({
  personalData,
  cartTotal,
  addressString,
  commentsInput,
  urgentMaking,
  userParams,
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
          <p className={styles.infoP}>{personalData.name}</p>
          <p className={styles.infoP}>{personalData.email}</p>
          <p className={styles.infoP}>{personalData.number}</p>
          <p className={styles.infoP}>{personalData.telegram_instagram}</p>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoLeftDiv}>
          <p className={styles.infoMainP}>Стоимость заказа:</p>
          <p className={styles.infoMainP}>Cрочность:</p>
          <p className={styles.infoMainP}>Адрес доставки:</p>
          <p className={styles.infoMainP}>Комментарии к заказу:</p>
        </div>

        <div className={styles.infoRightDiv}>
          <p className={styles.infoP}>{cartTotal}</p>
          <p className={styles.infoP}>{urgentMaking ? 'да' : 'нет'}</p>
          <p className={styles.infoP}>{addressString}</p>
          <p className={styles.infoP}>{commentsInput}</p>
        </div>
      </div>

      <div className={styles.infoContainer}>userParams</div>
    </div>
  );
}
