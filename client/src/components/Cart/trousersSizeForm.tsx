import React, { ChangeEvent } from 'react';
import styles from '../../styles/Cart.module.css';

export default function TrousersSizeForm({ onTrousersSizeChange }) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTrousersSizeChange({ [name]: value });
  };

  return (
    <>
      <div>
        <label htmlFor="saddle" className={styles.sizesFormLabel}>
          &quot;Седло&quot; брюк
        </label>
        <input
          type="text"
          name="saddle"
          className={styles.sizesFormInput}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
