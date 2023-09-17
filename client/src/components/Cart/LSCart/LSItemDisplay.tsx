import React from 'react';
import MeasurementsForm from '../MeasurementsForm';
import LikeButton from '../../likeButton/LikeButton';
import styles from '../../../styles/Checkout.module.css';
import Image from 'next/image';
import Link from 'next/link';
import DelBtn from '../DelBtn';
import { ISingleItem } from '@/app/types/cartTypes';
import { useCartControl } from '../useCartControl';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';

export default function LSItemDisplay({
  item,
  index,
}: {
  item: ISingleItem;
  index: number;
}) {
  const { handleDeleteItemFromCart, handleDisplaySizesForm } = useCartControl();
  const localData = JSON.parse(localStorage.getItem('cartItems')) || [];
  const userParams = useAppSelector(
    (state: RootState) => state.cartControlSlice.userParams
  );
  const showParamsForm = useAppSelector(
    (state: RootState) => state.cartControlSlice.showParamsForm
  );

  return (
    <div className={styles.basketItem}>
      <div className={styles.basketItemLeft}>
        <Link href={`/catalog/categoryName/${item.id}`}>
          <Image
            width={300}
            height={500}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.Photos[0].photo}`}
            alt={item.name}
            className={styles.basketItemImage}
          />
        </Link>
      </div>
      <div className={styles.basketItemRight}>
        <div className={styles.basketItemContent}>
          <Link
            href={`/catalog/categoryName/${item.id}`}
            className={styles.basketItemTitle}
          >
            {item.name}
          </Link>
          <div className={styles.iconsContainer}>
            <LikeButton itemId={item.id} />
            <DelBtn
              itemId={item.id}
              handleDeleteItemFromCart={handleDeleteItemFromCart}
            />
          </div>
        </div>
        <div className={styles.basketItemContent}>
          <div className={styles.basketItemProperties}>
            <div>Артикул: {item.article}</div>
          </div>
        </div>
        <div className={styles.basketItemContent}>
          <div className={styles.basketItemProperties}>
            {item.selected_material ? (
              <div>Материал: {item.selected_material}</div>
            ) : (
              <div>Материал: {item.Material.name}</div>
            )}
          </div>
        </div>
        <div className={styles.basketItemContent}>
          {item.in_stock ? (
            <>
              <div className={styles.itemPrices}>
                <span className={`${styles.itemPricesPrice} ${styles.red}`}>
                  {item.new_price.toLocaleString()} &#8381;
                </span>
                <span
                  className={`${styles.itemPricesPrice}  ${styles.strikethrough}`}
                >
                  {item.price.toLocaleString()} &#8381;
                </span>
              </div>
            </>
          ) : (
            <div className={styles.itemPrice}>
              <span className={styles.itemPricesPrice}>
                {item.price.toLocaleString()} &#8381;
              </span>
            </div>
          )}
        </div>
        {item.in_stock ? (
          <div className={styles.basketItemContent}>
            <div className={styles.itemPrices}>
              <span className={styles.itemPricesPrice}>
                {item.model_params}
              </span>
            </div>
          </div>
        ) : (
          <>
            {userParams[index] ||
            localData.find((data) => data.id === item.id)?.height ? (
              <>
                <div className={styles.userParameters}>
                  <div className={styles.itemPrices}>
                    <span className={styles.itemPricesPrice}>
                      {userParams[index] || (
                        <div>
                          Ваш рост:{' '}
                          {localData.find((data) => data.id === item.id).height}
                          см, Длина изделия:{' '}
                          {localData.find((data) => data.id === item.id).length}
                          см, Длина рукава:{' '}
                          {localData.find((data) => data.id === item.id).sleeve}
                          см, Объем груди:{' '}
                          {localData.find((data) => data.id === item.id).bust}
                          см, Объем талии:
                          {localData.find((data) => data.id === item.id).waist}
                          см, Объем бедер:{' '}
                          {localData.find((data) => data.id === item.id).hips}
                          см
                          {localData.find((data) => data.id === item.id).lining
                            ? `, Утепление: ${
                                localData.find((data) => data.id === item.id)
                                  .lining
                              }`
                            : ''}
                          {localData.find((data) => data.id === item.id).buttons
                            ? `, Фурнитура: ${
                                localData.find((data) => data.id === item.id)
                                  .buttons
                              }`
                            : ''}
                          {localData.find((data) => data.id === item.id).loops
                            ? `, со шлёвками`
                            : ''}
                          {localData.find((data) => data.id === item.id).saddle
                            ? `, седло: ${
                                localData.find((data) => data.id === item.id)
                                  .saddle
                              }`
                            : ''}
                        </div>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  className={styles.showSizeFormBtn}
                  onClick={() => handleDisplaySizesForm(index, item.id)}
                >
                  Изменить мерки
                </button>
              </>
            ) : (
              <button
                className={styles.showSizeFormBtn}
                onClick={() => handleDisplaySizesForm(index, item.id)}
              >
                Ввести мерки
              </button>
            )}
          </>
        )}
        {showParamsForm[item.id] && (
          <MeasurementsForm index={index} item={item} />
        )}
      </div>
    </div>
  );
}
