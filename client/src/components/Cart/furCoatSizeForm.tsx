import React from 'react';
import styles from '../../styles/Cart.module.css';

export default function FurCoatSizeForm({ itemId }) {
  return (
    <>
      <div>
        <input
          type="checkbox"
          name="loops"
          id={`loops${itemId}`}
          className={styles.sizesFormCheckbox}
        />
        <label htmlFor={`loops${itemId}`} className={styles.sizesFormLabel}>
          Хочу шлёвки
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="buttons"
          id={`pugovitsy${itemId}`}
          value="pugovitsy"
          className={styles.sizesFormCheckbox}
        />
        <label htmlFor={`pugovitsy${itemId}`} className={styles.sizesFormLabel}>
          Хочу пуговицы
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="buttons"
          value="knopki"
          id={`knopki${itemId}`}
          className={styles.sizesFormCheckbox}
        />
        <label htmlFor={`knopki${itemId}`} className={styles.sizesFormLabel}>
          Хочу кнопки
        </label>
      </div>
      <div>
        <label htmlFor="lining" className={styles.sizesFormLabel}>
          Утепление
        </label>
        <select name="lining" id="" className={styles.sizesFormSelect}>
          <option value="minus15">Утепление до -15 градусов</option>
          <option value="minus25">Утепление до -25 градусов</option>
        </select>
      </div>
    </>
  );
}
