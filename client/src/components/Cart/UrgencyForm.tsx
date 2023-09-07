import React from 'react';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';

export default function UrgencyForm({ handleUrgentChange }) {
  // const { handleUrgentChange } = useCartControl();

  return (
    <section className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}>
      <h2 className={styles.headerItemCart}>Срочный пошив</h2>
      <div className={styles.formBlock}>
        <label
          id="urgent"
          className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
        >
          <input
            type="checkbox"
            name="urgent"
            className={styles.checkboxIcon}
            onChange={handleUrgentChange}
          />
          <span className={styles.checkboxLabel}>
            <span className={styles.checkboxHeader}>
              Изготовление изделия за 5 дней
            </span>
            <span className={styles.checkboxDescription}>
              <em>+20% к стоимости изделия</em>
            </span>
          </span>
        </label>
      </div>
    </section>
  );
}
