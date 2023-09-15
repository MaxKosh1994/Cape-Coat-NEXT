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
  const {
    showSpinner,
    showParamsForm,
    deliveryCost,
    showAddressInputs,
    delError,
    orderStatus,
    promoUsed,
    promocode,
    promocodeErr,
    discount,
    twoItemDiscount,
    urgencyFee,
    urgentMaking,
    liningCost,
    cartTotal,
    userParams,
    handleDisplaySizesForm,
    handlePersonalDataInputChange,
    handleDeleteItemFromCart,
    handleSaveSizesInputs,
    handlePromocodeChange,
    handleApplyPromocode,
    handleChange,
    handleInputChange,
    handleUrgentChange,
    handleDeliveryChange,
    handleCommentChange,
    handleCreateOrder,
    handleCustomFormChange,
  } = useCartControl();

  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const cartItemsList = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  console.log(showSpinner);

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
                        <ItemDisplay
                          key={item.id}
                          index={index}
                          item={item}
                          handleDeleteItemFromCart={handleDeleteItemFromCart}
                          userParams={userParams}
                          handleDisplaySizesForm={handleDisplaySizesForm}
                          showParamsForm={showParamsForm}
                          handleChange={handleChange}
                          handleSaveSizesInputs={handleSaveSizesInputs}
                          handleCustomFormChange={handleCustomFormChange}
                        />
                      ))
                    : cartItemsList?.map((item, index) => (
                        <LSItemDisplay
                          key={item.id}
                          index={index}
                          item={item}
                          handleDeleteItemFromCart={handleDeleteItemFromCart}
                          userParams={userParams}
                          handleDisplaySizesForm={handleDisplaySizesForm}
                          showParamsForm={showParamsForm}
                          handleChange={handleChange}
                          handleSaveSizesInputs={handleSaveSizesInputs}
                          handleCustomFormChange={handleCustomFormChange}
                        />
                      ))}
                </section>
                {!user && (
                  <PersonalDataForm
                    handlePersonalDataInputChange={
                      handlePersonalDataInputChange
                    }
                  />
                )}
                <UrgencyForm handleUrgentChange={handleUrgentChange} />
                <CommentForm handleCommentChange={handleCommentChange} />
                <DeliveryForm
                  handleDeliveryChange={handleDeliveryChange}
                  handleInputChange={handleInputChange}
                  showAddressInputs={showAddressInputs}
                />
              </div>
              <RightBlock
                promocode={promocode}
                handlePromocodeChange={handlePromocodeChange}
                handleApplyPromocode={handleApplyPromocode}
                promocodeErr={promocodeErr}
                promoUsed={promoUsed}
                discount={discount}
                twoItemDiscount={twoItemDiscount}
                deliveryCost={deliveryCost}
                liningCost={liningCost}
                urgencyFee={urgencyFee}
                urgentMaking={urgentMaking}
                cartTotal={cartTotal}
                cartItemsList={cartItemsList}
                orderStatus={orderStatus}
                handleCreateOrder={handleCreateOrder}
              />
            </section>
          </div>
        </>
      )}
    </>
  );
}
