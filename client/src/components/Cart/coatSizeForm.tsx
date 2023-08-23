import React, { ChangeEvent } from 'react';
import styles from '../../styles/Cart.module.css';

export default function CoatSizeForm({ itemId, onCoatSizeChange }) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    onCoatSizeChange({ [name]: newValue });
  };

  return (
    <>
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
        <input
          type="radio"
          name="buttons"
          id={`pugovitsy${itemId}`}
          value="pugovitsy"
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
          value="knopki"
          id={`knopki${itemId}`}
          className={styles.sizesFormCheckbox}
          onChange={handleInputChange}
        />
        <label htmlFor={`knopki${itemId}`} className={styles.sizesFormLabel}>
          Хочу кнопки
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
          <option value="none">Без утепления (до 0 градусов) 16.500₽</option>
          <option value="minus5">
            Тонкое утепление (до -5 градусов) 17.900₽
          </option>
          <option value="minus10">
            Утепление с мембраной (до -10 градусов) *идеально для зимы* 17.900₽
          </option>
          <option value="minus20">
            Утепление двойным слоем с мембраной (до -20 градусов) *обьемное
            утепление* 17.900₽
          </option>
        </select>
      </div>
    </>
  );
}
