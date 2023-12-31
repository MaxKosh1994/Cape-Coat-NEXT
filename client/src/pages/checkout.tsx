import React from 'react';
import { RootState } from '@/app/store';
import { useAppSelector } from '@/app/hooks';
import { useCartControl } from '@/components/Cart/useCartControl';
import styles from '../styles/Checkout.module.css';
import Link from 'next/link';
import Head from 'next/head';
import CircularProgress from '@mui/material/CircularProgress';
import UrgencyForm from '@/components/Cart/UrgencyForm';
import CommentForm from '@/components/Cart/CommentForm';
import DeliveryForm from '@/components/Cart/DeliveryForm';
import PersonalDataForm from '@/components/Cart/PersonalDataForm';
import ItemDisplay from '@/components/Cart/ItemDisplay';
import RightBlock from '@/components/Cart/RightBlock';
import LSItemDisplay from '@/components/Cart/LSCart/LSItemDisplay';

export default function CheckoutPage() {
  const { showSpinner, delError } = useCartControl();

  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const cartItemsList = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  const orderStatus = useAppSelector(
    (state: RootState) => state.cartControlSlice.orderStatus
  );

  return (
    <>
      <Head>
        <title>Cape&Coat | Корзина</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSpinner ? (
        <div className={styles.spinnerCart}>
          <CircularProgress color="inherit" />
        </div>
      ) : cartItemsList?.length === 0 ? (
        <>
          {orderStatus && <p className="order-status-cart">{orderStatus}</p>}
          <p className={styles.emptyCartMsg}>
            Сейчас в вашей корзине пусто.{' '}
            <Link href="/catalog">Загляните в каталог</Link>
          </p>
        </>
      ) : (
        <>
          <div className={styles.container}>
            <section className={styles.order}>
              <div className={styles.orderForm}>
                <h1 className={styles.headerItemCart}>
                  Корзина&nbsp;<span>({cartItemsList.length})</span>
                </h1>
                <p className={styles.errorMsgCart}>{delError}</p>
                <section
                  className={`${styles.orderBlock} ${styles.orderBlockBasket}`}
                >
                  {user
                    ? cartItemsList?.map((item, index) => (
                        <ItemDisplay key={item.id} index={index} item={item} />
                      ))
                    : cartItemsList?.map((item, index) => (
                        <LSItemDisplay
                          key={item.id}
                          index={index}
                          item={item}
                        />
                      ))}
                </section>
                {!user && <PersonalDataForm />}
                <UrgencyForm />
                <CommentForm />
                <DeliveryForm />
              </div>
              <RightBlock />
            </section>
          </div>
        </>
      )}
    </>
  );
}
