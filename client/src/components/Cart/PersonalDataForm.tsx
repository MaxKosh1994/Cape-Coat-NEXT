import React from 'react';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';

export default function PersonalDataForm() {
  const { handlePersonalDataInputChange } = useCartControl();
  const personalData = useAppSelector(
    (state: RootState) => state.cartControlSlice.personalData
  );
  return (
    <section className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}>
      <h2 className={styles.headerItemCart}>Ваши данные</h2>
      <div className={styles.formBlock}>
        <div className={styles.deliveryService}>
          <div className={styles.deliveryServiceForm}>
            <div>
              <div className={styles.inputLocation}>
                <div className={styles.formControl}>
                  <label className={styles.formControlLabel}>Имя*</label>
                  <input
                    role="text"
                    title="Имя*"
                    placeholder=""
                    name="name"
                    className={styles.formInput}
                    defaultValue={personalData.name}
                    onChange={handlePersonalDataInputChange}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.formControlLabel}>Email*</label>
                  <input
                    role="text"
                    title="Email*"
                    placeholder=""
                    name="email"
                    type="email"
                    className={styles.formInput}
                    defaultValue={personalData.email}
                    onChange={handlePersonalDataInputChange}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.formControlLabel}>Пароль*</label>
                  <input
                    role="password"
                    title="Пароль*"
                    placeholder=""
                    name="password"
                    type="password"
                    className={styles.formInput}
                    defaultValue={personalData.password}
                    onChange={handlePersonalDataInputChange}
                  />
                </div>
              </div>
              <div className={styles.formControl}>
                <label className={styles.formControlLabel}>Телефон*</label>
                <input
                  role="text"
                  title="Телефон*"
                  name="phone"
                  placeholder=""
                  className={styles.formInput}
                  defaultValue={personalData.phone}
                  onChange={handlePersonalDataInputChange}
                />
              </div>
              <div className={styles.formControl}>
                <label className={styles.formControlLabel}>
                  Телеграм/Соцсети
                </label>
                <input
                  role="text"
                  title="Телеграм/соцсети*"
                  name="telegram_instagram"
                  placeholder=""
                  className={styles.formInput}
                  defaultValue={personalData.telegram_instagram}
                  onChange={handlePersonalDataInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
