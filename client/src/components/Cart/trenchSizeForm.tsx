import React, { ChangeEvent } from 'react';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';

export default function TrenchSizeForm({ itemId }: { itemId: number }) {
  const { handleCustomFormChange } = useCartControl();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'loops') {
      handleCustomFormChange({ loops: checked });
    } else if (name === 'buttons') {
      handleCustomFormChange({ buttons: value });
    }
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
          value="пуговицы"
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
