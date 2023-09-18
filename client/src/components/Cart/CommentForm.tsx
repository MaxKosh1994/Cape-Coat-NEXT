import React from 'react';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';

export default function CommentForm() {
  const { handleCommentChange } = useCartControl();
  return (
    <section className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}>
      <h2 className={styles.headerItemCart}>Комментарии к заказу</h2>
      <div className={`${styles.formBlock} ${styles.commentCart}`}>
        <label
          className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
        >
          <div className={styles.formControl}>
            <label
              className={`${styles.formControlLabel} ${styles.formControlLabelVisible}`}
            ></label>
            <textarea
              className={`${styles.commentInput} ${styles.formInput}`}
              role="text"
              title="Комментарии"
              placeholder="Ваши пожелания..."
              name="comments"
              rows={5}
              cols={50}
              onChange={handleCommentChange}
            />
          </div>
        </label>
      </div>
    </section>
  );
}
