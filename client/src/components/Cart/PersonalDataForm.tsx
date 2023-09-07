import React from 'react';
import styles from '../../styles/Checkout.module.css';

export default function PersonalDataForm({ handlePersonalDataInputChange }) {
  return (
    <section className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}>
      <h2 className={styles.headerItemCart}>Ваши данные</h2>
      <div className={styles.formBlock}>
        <div className={styles.deliveryService}>
          <div className={styles.deliveryServiceForm}>
            <div>
              <div className={styles.inputLocation}>
                <div className={styles.formControl}>
                  <label className={styles.formControlLabel}>Имя</label>
                  <input
                    role="text"
                    title="Имя*"
                    placeholder=""
                    name="name"
                    className={styles.formInput}
                    onChange={handlePersonalDataInputChange}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.formControlLabel}>Email</label>
                  <input
                    role="text"
                    title="Email*"
                    placeholder=""
                    name="email"
                    className={styles.formInput}
                    onChange={handlePersonalDataInputChange}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.formControlLabel}>Пароль</label>
                  <input
                    role="password"
                    title="Пароль*"
                    placeholder=""
                    name="password"
                    className={styles.formInput}
                    onChange={handlePersonalDataInputChange}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.inputLocation}>
                  <div className={styles.formControl}>
                    <label className={styles.formControlLabel}>Телефон</label>
                    <input
                      role="text"
                      title="Телефон*"
                      name="phone"
                      placeholder=""
                      className={styles.formInput}
                      onChange={handlePersonalDataInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
