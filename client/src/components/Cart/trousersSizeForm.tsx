import React, { ChangeEvent } from 'react';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';

export default function TrousersSizeForm() {
  const { handleCustomFormChange } = useCartControl();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleCustomFormChange({ [name]: value });
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
