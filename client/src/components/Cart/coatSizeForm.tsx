import React, { ChangeEvent } from 'react';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';

export default function CoatSizeForm({ itemId }: { itemId: number }) {
  const { handleCustomFormChange } = useCartControl();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    handleCustomFormChange({ [name]: newValue });
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
          id="loops"
          className={styles.sizesFormCheckbox}
          onChange={handleInputChange}
        />
        <label htmlFor="loops" className={styles.sizesFormLabel}>
          Хочу шлёвки
        </label>
      </div>
      <div>
        <label htmlFor="lining" className={styles.sizesFormLabel}>
          Утепление
        </label>
        <select
          name="lining"
          id="lining"
          className={styles.sizesFormSelect}
          onChange={handleInputChange}
        >
          <option value="none">Без утепления (до 0 градусов)</option>
          <option value="-5 градусов">
            Тонкое утепление (до -5 градусов) +1.400₽
          </option>
          <option value="-10 градусов">
            Утепление с мембраной (до -10 градусов) *идеально для зимы* +1.400₽
          </option>
        </select>
      </div>
    </>
  );
}
