import React from 'react';
import styles from '../../styles/Checkout.module.css';
import BackToTopArrow from '../ToTopArrow/ToTopArrow';

export default function DeliveryForm({
  handleDeliveryChange,
  handleInputChange,
  showAddressInputs,
}) {
  return (
    <section className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}>
      <h2 className={styles.headerItemCart}>Способ доставки</h2>
      <div className={styles.formBlock}>
        <label
          className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
        >
          <input
            role="radio"
            type="radio"
            name="delivery"
            value="showroom"
            className={styles.checkboxIcon}
            onChange={handleDeliveryChange}
            defaultChecked={true}
          />
          <span className={styles.checkboxLabel}>
            <span className={styles.checkboxHeader}>Забрать в шоу-руме</span>
            <span className={styles.checkboxDescription}>
              <em>Нижний Новгород, ул. Малая Покровская, 20</em>
            </span>
            <span className={styles.checkboxDescription}>
              <em>Будние дни, с 10:00 до 20:00</em>
            </span>
            <span className={styles.checkboxDescription}>
              <strong>Бесплатно</strong>
            </span>
          </span>
        </label>
      </div>
      <div className={styles.formBlock}>
        <label
          className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
        >
          <input
            role="radio"
            type="radio"
            name="delivery"
            value="post"
            className={styles.checkboxIcon}
            onChange={handleDeliveryChange}
          />
          <span className={styles.checkboxLabel}>
            <span className={styles.checkboxHeader}>
              Доставка СДЭК или Почтой России
            </span>
            <span className={styles.checkboxDescription}>
              <strong>от 300 рублей</strong>, от 3 дней
            </span>
            <span className={styles.checkboxDescription}>
              <em>
                Точную стоимость доставки вам сообщит менеджер. Итоговая сумма
                заказа может измениться.
              </em>
            </span>
          </span>
        </label>
        {showAddressInputs && (
          <div className={styles.deliveryService}>
            <div className={styles.deliveryServiceForm}>
              <div>
                <div className={styles.inputLocation}>
                  <div className={styles.formControl}>
                    <label className={styles.formControlLabel}>Город</label>
                    <input
                      role="text"
                      title="Город"
                      placeholder=""
                      name="city"
                      className={styles.formInput}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formControl}>
                    <label className={styles.formControlLabel}>Улица</label>
                    <input
                      role="text"
                      title="Улица*"
                      placeholder=""
                      name="street"
                      className={styles.formInput}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <div className={styles.inputLocation}>
                    <div className={styles.formControl}>
                      <label className={styles.formControlLabel}>Дом</label>
                      <input
                        role="text"
                        title="Дом"
                        name="number"
                        placeholder=""
                        className={styles.formInput}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className={styles.formControl}>
                    <label className={styles.formControlLabel}>
                      Квартира/Офис
                    </label>
                    <input
                      role="text"
                      name="flat"
                      title="Квартира/Офис"
                      placeholder=""
                      className={styles.formInput}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <BackToTopArrow />
    </section>
  );
}
