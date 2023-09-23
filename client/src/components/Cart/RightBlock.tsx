import React from 'react';
import styles from '../../styles/Checkout.module.css';
import { useCartControl } from './useCartControl';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';

export default function RightBlock() {
  const { handlePromocodeChange, handleApplyPromocode, handleCreateOrder } =
    useCartControl();
  const cartItemsList = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  const {
    promocode,
    promocodeErr,
    promoUsed,
    discount,
    twoItemDiscount,
    deliveryCost,
    liningCost,
    urgencyFee,
    urgentMaking,
    cartTotal,
    orderStatus,
  } = useAppSelector((state: RootState) => state.cartControlSlice);
  return (
    <div className={`${styles.orderBlock} ${styles.orderBlockSummary}`}>
      <h1 className={styles.headerItemCart}>Ваш заказ</h1>
      <div className={styles.promocodeInputContainer}>
        <p
          className={`${styles.orderDescription} ${styles.orderDescriptionOnlinePayment}`}
        >
          <input
            className={styles.promocodeInput}
            type="text"
            placeholder="Промокод"
            value={promocode}
            onChange={handlePromocodeChange}
          />
        </p>
        <button
          className={`${styles.button} ${styles.buttonBlock}  ${styles.buttonBordered}`}
          onClick={handleApplyPromocode}
        >
          Применить
        </button>
      </div>
      {promocodeErr && (
        <p className={`${styles.errorMsgCart} ${styles.pcErr}`}>
          {promocodeErr}
        </p>
      )}
      {promoUsed && (
        <p className={`${styles.errorMsgCart} ${styles.pcErr}`}>
          Вы использовали промокод
        </p>
      )}
      <div className={styles.orderSummary}>
        <div className={styles.summary}>
          <div className={styles.orderSummaryRow}>
            <span>Товары ({cartItemsList.length}):</span>
            <div className={styles.itemPrices}>
              {(!promocodeErr && discount) || twoItemDiscount ? (
                <>
                  <span
                    className={styles.itemPricesPrice}
                    style={{ textDecoration: 'line-through' }}
                  >
                    {Math.floor(
                      cartItemsList.reduce((sum, item) => sum + item.price, 0)
                    ).toLocaleString()}{' '}
                    &#8381;
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.itemPricesPrice}>
                    {Math.floor(
                      cartItemsList.reduce((sum, item) => sum + item.price, 0)
                    ).toLocaleString()}{' '}
                    &#8381;
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={styles.orderSummaryRow}>
            <span>Доставка:</span>
            <div className={styles.itemPrices}>
              <span className={styles.itemPricesPrice}>
                {Math.floor(deliveryCost).toLocaleString()} &#8381;
              </span>
            </div>
          </div>
          {urgentMaking ? (
            <div className={styles.orderSummaryRow}>
              <span>Срочность:</span>
              <div className={styles.itemPrices}>
                <span className={styles.itemPricesPrice}>
                  {Math.floor(urgencyFee).toLocaleString()} &#8381;
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {liningCost ? (
            <div className={styles.orderSummaryRow}>
              <span>Утепление:</span>
              <div className={styles.itemPrices}>
                <span className={styles.itemPricesPrice}>
                  +{Math.floor(liningCost).toLocaleString()} &#8381;
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.orderSummaryRow}>
            <span>Скидка:</span>
            <div className={styles.itemPrices}>
              {twoItemDiscount ? (
                <span className={styles.itemPricesPrice}>
                  -{(discount + twoItemDiscount).toLocaleString()} &#8381;
                </span>
              ) : (
                <span className={styles.itemPricesPrice}>
                  -{Math.floor(discount).toLocaleString()} &#8381;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.orderSummary} ${styles.orderSummaryTotal}`}>
        <div className={styles.orderSummaryRow}>
          <span>Итого:</span>
          <div className={styles.itemPrices}>
            <span className={styles.itemPrices}>
              {Math.floor(cartTotal).toLocaleString()} &#8381;
            </span>
          </div>
        </div>
      </div>
      {!orderStatus && (
        <button
          className={`${styles.button} ${styles.buttonBlock} ${styles.buttonBig} ${styles.buttonBordered} ${styles.orderButton}`}
          onClick={() => {
            handleCreateOrder();
          }}
        >
          <span className={styles.buttonContent}>Оформить заказ</span>
        </button>
      )}
      {orderStatus && <p className={styles.orderStatusCart}>{orderStatus}</p>}
    </div>
  );
}
