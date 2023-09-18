import React from 'react';
import CustomFormPart from './CustomFormPart';
import Link from 'next/link';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';
import { ISingleItem } from '@/app/types/cartTypes';

export default function MeasurementsForm({
  index,
  item,
}: {
  index: number;
  item: ISingleItem;
}) {
  const { handleChange, handleSaveSizesInputs } =
    useCartControl();

  return (
    <>
      <div className={styles.basketItemContent}>
        <div className={styles.itemPrices}>
          <Link className={styles.faqLink} href="/FAQ/measurementsFAQ">
            Посмотреть как снимать мерки
          </Link>
        </div>
      </div>
      <div className={styles.sizesForm}>
        <form action="">
          <div className={styles.sizesFormBlock}>
            <div>
              <label htmlFor="height" className={styles.sizesFormLabel}>
                Ваш рост
              </label>
              <input
                type="text"
                name="height"
                className={styles.sizesFormInput}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="length" className={styles.sizesFormLabel}>
                Длина изделия
              </label>
              <input
                type="text"
                name="length"
                className={styles.sizesFormInput}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sleeve" className={styles.sizesFormLabel}>
                Длина рукава
              </label>
              <input
                type="text"
                name="sleeve"
                className={styles.sizesFormInput}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="bust" className={styles.sizesFormLabel}>
                Объем груди
              </label>
              <input
                type="text"
                name="bust"
                className={styles.sizesFormInput}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="waist" className={styles.sizesFormLabel}>
                Объем талии
              </label>
              <input
                type="text"
                name="waist"
                className={styles.sizesFormInput}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="hips" className={styles.sizesFormLabel}>
                Объем бедер
              </label>
              <input
                type="text"
                name="hips"
                className={styles.sizesFormInput}
                onChange={handleChange}
              />
            </div>
            <CustomFormPart
              catId={item.category_id}
              itemId={item.id}
            />
          </div>
          <button
            className={styles.sizesFormBtn}
            onClick={(event) => {
              event.preventDefault();
              handleSaveSizesInputs(index, item.id);
            }}
          >
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
}
