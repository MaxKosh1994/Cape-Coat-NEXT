import React, { useEffect } from 'react';
import styles from '../styles/Checkout.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import LikeButton from '@/components/likeButton/LikeButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BackToTopArrow from '@/components/ToTopArrow/ToTopArrow';
import { RootState } from '@/app/store';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useCartControl } from '@/components/Cart/useCartControl';
import CustomFormPart from '@/components/Cart/CustomFormPart';

export default function CheckoutPage() {
  const {
    cartItemsList,
    showParamsForm,
    selectedDelivery,
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
    cartTotal,
    userParams,
    fetchCartItems,
    countDeliveryCost,
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
    countCartTotal,
    handleCreateOrder,
  } = useCartControl();
  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // стукается через санку на бек, грузит список товаров добавленных в корзину
    fetchCartItems();
  }, [dispatch, user]);

  useEffect(() => {
    // подсчет ИТОГО заказа
    countCartTotal();
  }, [
    cartItemsList,
    discount,
    twoItemDiscount,
    deliveryCost,
    urgentMaking,
    dispatch,
    cartTotal,
  ]);

  useEffect(() => {
    // подсчет стоимости доставки в зависимости от почта\шоурум
    countDeliveryCost();
  }, [selectedDelivery]);

  return (
    <>
      <Head>
        <title>Cape&Coat | Корзина</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {cartItemsList?.length === 0 ? (
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
                  {cartItemsList.map((item, index) => (
                    <div className={styles.basketItem} key={item.id}>
                      <div className={styles.basketItemLeft}>
                        <Link
                          href={`/catalog/categoryName/${item.id}`}
                          rel="noopener noreferrer"
                        >
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
                            <LikeButton item={item.id} />
                            <button
                              className={styles.basketItemDeleteButton}
                              type="button"
                              onClick={() => handleDeleteItemFromCart(item.id)}
                            >
                              <DeleteOutlineIcon
                                sx={{ fontSize: '2rem', color: '#656565' }}
                              />
                            </button>
                          </div>
                        </div>
                        <div className={styles.basketItemContent}>
                          <div className={styles.basketItemProperties}>
                            <div>Артикул: {item.article}</div>
                          </div>
                        </div>
                        <div className={styles.basketItemContent}>
                          <div className={styles.basketItemProperties}>
                            <div>Материал: {item.Material.name}</div>
                          </div>
                        </div>
                        <div className={styles.basketItemContent}>
                          {item.in_stock ? (
                            <>
                              <div className={styles.itemPrices}>
                                <span
                                  className={`${styles.itemPricesPrice} ${styles.red}`}
                                >
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
                          <>
                            <div className={styles.basketItemContent}>
                              <div className={styles.itemPrices}>
                                <span className={styles.itemPricesPrice}>
                                  {item.model_params}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {userParams[index] ||
                            item.Carts[0].CartItem.added ? (
                              <>
                                <div className={styles.userParameters}>
                                  <div className={styles.itemPrices}>
                                    <span className={styles.itemPricesPrice}>
                                      {userParams[index] ||
                                        `Ваш рост: ${item.Carts[0].CartItem.height}см, Длина изделия: ${item.Carts[0].CartItem.length}см, Длина рукава: ${item.Carts[0].CartItem.sleeve}см, Объем груди: ${item.Carts[0].CartItem.bust}см, Объем талии: ${item.Carts[0].CartItem.waist}см, Объем бедер: ${item.Carts[0].CartItem.hips}см`}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  className={styles.showSizeFormBtn}
                                  onClick={() =>
                                    handleDisplaySizesForm(index, item.id)
                                  }
                                >
                                  Изменить мерки
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className={styles.showSizeFormBtn}
                                  onClick={() =>
                                    handleDisplaySizesForm(index, item.id)
                                  }
                                >
                                  Ввести мерки
                                </button>
                              </>
                            )}
                          </>
                        )}
                        {showParamsForm[item.id] && (
                          <>
                            <div className={styles.basketItemContent}>
                              <div className={styles.itemPrices}>
                                <Link
                                  className={styles.faqLink}
                                  href="/FAQ/measurementsFAQ"
                                >
                                  Посмотреть как снимать мерки
                                </Link>
                              </div>
                            </div>
                            <div className={styles.sizesForm}>
                              <form action="">
                                <div className={styles.sizesFormBlock}>
                                  <div>
                                    <label
                                      htmlFor="height"
                                      className={styles.sizesFormLabel}
                                    >
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
                                    <label
                                      htmlFor="length"
                                      className={styles.sizesFormLabel}
                                    >
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
                                    <label
                                      htmlFor="sleeve"
                                      className={styles.sizesFormLabel}
                                    >
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
                                    <label
                                      htmlFor="bust"
                                      className={styles.sizesFormLabel}
                                    >
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
                                    <label
                                      htmlFor="waist"
                                      className={styles.sizesFormLabel}
                                    >
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
                                    <label
                                      htmlFor="hips"
                                      className={styles.sizesFormLabel}
                                    >
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
                        )}
                      </div>
                    </div>
                  ))}
                </section>

                {!user && (
                  <section
                    className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}
                  >
                    <h2 className={styles.headerItemCart}>Ваши данные</h2>
                    <div className={styles.formBlock}>
                      <div className={styles.deliveryService}>
                        <div className={styles.deliveryServiceForm}>
                          <div>
                            <div className={styles.inputLocation}>
                              <div className={styles.formControl}>
                                <label className={styles.formControlLabel}>
                                  Имя
                                </label>
                                <input
                                  role="text"
                                  title="Имя"
                                  placeholder=""
                                  name="name"
                                  className={styles.formInput}
                                  onChange={handlePersonalDataInputChange}
                                />
                              </div>
                              <div className={styles.formControl}>
                                <label className={styles.formControlLabel}>
                                  Email
                                </label>
                                <input
                                  role="text"
                                  title="Email*"
                                  placeholder=""
                                  name="email"
                                  className={styles.formInput}
                                  onChange={handlePersonalDataInputChange}
                                />
                              </div>
                            </div>
                            <div className={styles.inputGroup}>
                              <div className={styles.inputLocation}>
                                <div className={styles.formControl}>
                                  <label className={styles.formControlLabel}>
                                    Телефон
                                  </label>
                                  <input
                                    role="text"
                                    title="Телефон"
                                    name="phone"
                                    placeholder=""
                                    className={styles.formInput}
                                    onChange={handlePersonalDataInputChange}
                                    disabled=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                <section
                  className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}
                >
                  <h2 className={styles.headerItemCart}>Срочный пошив</h2>
                  <div className={styles.formBlock}>
                    <label
                      id="urgent"
                      className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
                    >
                      <input
                        type="checkbox"
                        name="urgent"
                        className={styles.checkboxIcon}
                        onChange={handleUrgentChange}
                      />
                      <span className={styles.checkboxLabel}>
                        <span className={styles.checkboxHeader}>
                          Изготовление изделия за 5 дней
                        </span>
                        <span className={styles.checkboxDescription}>
                          <em>+20% к стоимости изделия</em>
                        </span>
                      </span>
                    </label>
                  </div>
                </section>
                <section
                  className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}
                >
                  <h2 className={styles.headerItemCart}>
                    Комментарии к заказу
                  </h2>
                  <div className={`${styles.formBlock} ${styles.commentCart}`}>
                    <label
                      className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
                    >
                      <div className={styles.formControl}>
                        <label
                          className={`${styles.formControlLabel} ${styles.formControlLabelVisible}`}
                        ></label>
                        <textarea
                          className={`${styles.commentInput} ${styles.formInput}`}
                          role="text"
                          title="Комментарии"
                          placeholder="Ваши пожелания..."
                          name="comments"
                          rows="5"
                          cols="50"
                          onChange={handleCommentChange}
                        />
                      </div>
                    </label>
                  </div>
                </section>
                <section
                  className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}
                >
                  <h2 className={styles.headerItemCart}>Способ доставки</h2>
                  <div className={styles.formBlock}>
                    <label
                      className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
                      // modelmodifiers="[object Object]"
                    >
                      <input
                        hidden=""
                        role="radio"
                        type="radio"
                        name="delivery"
                        value="showroom"
                        className={styles.checkboxIcon}
                        onChange={handleDeliveryChange}
                        defaultChecked={true}
                      />
                      <span className={styles.checkboxLabel}>
                        <span className={styles.checkboxHeader}>
                          Забрать в шоу-руме
                        </span>
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
                      // modelmodifiers="[object Object]"
                    >
                      <input
                        hidden=""
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
                            Точную стоимость доставки вам сообщит менеджер.
                            Итоговая сумма заказа может измениться.
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
                                <label className={styles.formControlLabel}>
                                  Город
                                </label>
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
                                <label className={styles.formControlLabel}>
                                  Улица
                                </label>
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
                                  <label className={styles.formControlLabel}>
                                    Дом
                                  </label>
                                  <input
                                    role="text"
                                    title="Дом"
                                    name="number"
                                    placeholder=""
                                    className={styles.formInput}
                                    onChange={handleInputChange}
                                    disabled=""
                                  />
                                  <div
                                    className={styles.formControlButtons}
                                  ></div>
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
                                  disabled=""
                                />
                                <div
                                  className={styles.formControlButtons}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <BackToTopArrow />
                </section>
              </div>
              <div
                className={`${styles.orderBlock} ${styles.orderBlockSummary}`}
              >
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
                              {cartItemsList
                                .reduce((sum, item) => sum + item.price, 0)
                                .toLocaleString()}{' '}
                              &#8381;
                            </span>
                          </>
                        ) : (
                          <>
                            <span className={styles.itemPricesPrice}>
                              {cartItemsList
                                .reduce((sum, item) => sum + item.price, 0)
                                .toLocaleString()}{' '}
                              &#8381;
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={styles.orderSummaryRow}>
                      <span>Скидка:</span>
                      <div className={styles.itemPrices}>
                        {twoItemDiscount ? (
                          <span className={styles.itemPricesPrice}>
                            {(discount + twoItemDiscount).toLocaleString()}{' '}
                            &#8381;
                          </span>
                        ) : (
                          <span className={styles.itemPricesPrice}>
                            {discount.toLocaleString()} &#8381;
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles.orderSummaryRow}>
                      <span>Доставка:</span>
                      <div className={styles.itemPrices}>
                        <span className={styles.itemPricesPrice}>
                          {deliveryCost.toLocaleString()} &#8381;
                        </span>
                      </div>
                    </div>
                    {urgencyFee ? (
                      <div className={styles.orderSummaryRow}>
                        <span>Срочность:</span>
                        <div className={styles.itemPrices}>
                          <span className={styles.itemPricesPrice}>
                            {urgencyFee.toLocaleString()} &#8381;
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.orderSummary} ${styles.orderSummaryTotal}`}
                >
                  <div className={styles.orderSummaryRow}>
                    <span>Итого:</span>
                    <div className={styles.itemPrices}>
                      <span className={styles.itemPrices}>
                        {cartTotal.toLocaleString()} &#8381;
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
                {orderStatus && (
                  <p className={styles.orderStatusCart}>{orderStatus}</p>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
