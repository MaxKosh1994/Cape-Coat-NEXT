import React from 'react';
import styles from '../../styles/Checkout.module.css';

export default function TrenchSizeForm({ itemId, onTrenchSizeChange }) {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    onTrenchSizeChange({ [name]: checked });
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          name="loops"
          id={`loops${itemId}`}
          className={styles.sizesFormCheckbox}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`loops${itemId}`} className={styles.sizesFormLabel}>
          Хочу шлёвки
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          name="buttons"
          id={`buttons${itemId}`}
          className={styles.sizesFormCheckbox}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`buttons${itemId}`} className={styles.sizesFormLabel}>
          Хочу пуговицы
        </label>
      </div>
    </>
  );
}
