import React from 'react';
import MeasurementsForm from './MeasurementsForm';
import LikeButton from '../likeButton/LikeButton';
import styles from '../../styles/Checkout.module.css';
import Image from 'next/image';
import Link from 'next/link';
import DelBtn from './DelBtn';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { useCartControl } from './useCartControl';
import { ISingleItem } from '@/app/types/cartTypes';

export default function ItemDisplay({
  item,
  index,
}: {
  item: ISingleItem;
  index: number;
}) {
  const { handleDeleteItemFromCart, handleDisplaySizesForm } = useCartControl();
  const userParams = useAppSelector(
    (state: RootState) => state.cartControlSlice.userParams
  );
  const showParamsForm = useAppSelector(
    (state) => state.cartControlSlice.showParamsForm
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
            {item.Carts[0].CartItem.selected_material ? (
              <div>Материал: {item.Carts[0].CartItem.selected_material}</div>
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
            {userParams[index] || item.Carts[0].CartItem.added ? (
              <>
                <div className={styles.userParameters}>
                  <div className={styles.itemPrices}>
                    <span className={styles.itemPricesPrice}>
                      {userParams[index] ||
                        `Ваш рост: ${
                          item.Carts[0].CartItem.height
                        }см, Длина изделия: ${
                          item.Carts[0].CartItem.length
                        }см, Длина рукава: ${
                          item.Carts[0].CartItem.sleeve
                        }см, Объем груди: ${
                          item.Carts[0].CartItem.bust
                        }см, Объем талии: ${
                          item.Carts[0].CartItem.waist
                        }см, Объем бедер: ${item.Carts[0].CartItem.hips}см${
                          item.Carts[0].CartItem.lining
                            ? `, Утепление: ${item.Carts[0].CartItem.lining}`
                            : ''
                        }${
                          item.Carts[0].CartItem.buttons
                            ? `, Фурнитура: ${item.Carts[0].CartItem.buttons}`
                            : ''
                        }${
                          item.Carts[0].CartItem.loops ? `, со шлёвками` : ''
                        }${
                          item.Carts[0].CartItem.saddle
                            ? `, седло: ${item.Carts[0].CartItem.saddle}`
                            : ''
                        }`}
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
