import React from 'react';
import styles from '../../styles/Cart.module.css';

export default function TrousersSizeForm() {
  return (
    <>
      <div>
        <label htmlFor="saddle" className={styles.sizesFormLabel}>
          &quot;Седло&quot; брюк
        </label>
        <input type="text" name="saddle" className={styles.sizesFormInput} />
      </div>
    </>
  );
}
