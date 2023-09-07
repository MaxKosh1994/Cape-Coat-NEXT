import React, { ChangeEvent } from 'react';
import styles from '../../styles/Checkout.module.css';

export default function FurCoatSizeForm({ itemId, onFurCoatSizeChange }) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    onFurCoatSizeChange({ [name]: newValue });
  };

  return (
    <>
      <div>
        <input
          type="radio"
          name="buttons"
          id={`pugovitsy${itemId}`}
          value="пуговицы"
          className={styles.sizesFormCheckbox}
          onChange={handleInputChange}
        />
        <label htmlFor={`pugovitsy${itemId}`} className={styles.sizesFormLabel}>
          Хочу пуговицы
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="buttons"
          value="кнопки"
          id={`knopki${itemId}`}
          className={styles.sizesFormCheckbox}
          onChange={handleInputChange}
        />
        <label htmlFor={`knopki${itemId}`} className={styles.sizesFormLabel}>
          Хочу кнопки
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          name="loops"
          id={`loops${itemId}`}
          className={styles.sizesFormCheckbox}
          onChange={handleInputChange}
        />
        <label htmlFor={`loops${itemId}`} className={styles.sizesFormLabel}>
          Хочу шлёвки
        </label>
      </div>
      <div>
        <label htmlFor="lining" className={styles.sizesFormLabel}>
          Утепление
        </label>
        <select
          name="lining"
          id=""
          className={styles.sizesFormSelect}
          onChange={handleInputChange}
        >
          <option value="-15 градусов">Утепление до -15 градусов</option>
          <option value="-25 градусов">Утепление до -25 градусов</option>
        </select>
      </div>
    </>
  );
}
