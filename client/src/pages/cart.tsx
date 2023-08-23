import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { delCartItemThunk, getCartItemsThunk } from '../app/thunkActionsCart';
import { getCartItems } from '../app/cartSlice';
import styles from '../styles/Cart.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Head from 'next/head';
import TrousersSizeForm from '@/components/Cart/trousersSizeForm';
import TrenchSizeForm from '@/components/Cart/trenchSizeForm';
import CoatSizeForm from '@/components/Cart/coatSizeForm';
import FurCoatSizeForm from '@/components/Cart/furCoatSizeForm';

export default function CartPage() {
  const user = useSelector((state) => state.sessionSlice.user);
  const name = useSelector((state) => state.sessionSlice.name);
  const router = useRouter();
  const dispatch = useDispatch();
  const [cartItemsList, setCartItemsList] = useState([]);
  const [delError, setDelError] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [promocode, setPromocode] = useState('');
  const [promoUsed, setPromoUsed] = useState(false);
  const [promocodeErr, setPromocodeErr] = useState('');
  const [discount, setDiscount] = useState(0);
  const [commentsInput, setCommentsInput] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('showroom');
  const [showAddressInputs, setShowAddressInputs] = useState(false);
  const [addressInputs, setAddressInputs] = useState({
    city: '',
    street: '',
    number: '',
    flat: '',
  });
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [showParamsForm, setShowParamsForm] = useState({});
  const [paramsFormData, setParamsFormData] = useState({
    itemId: 0,
    height: '',
    length: '',
    sleeve: '',
    bust: '',
    waist: '',
    hips: '',
    saddle: '',
    loops: '',
    buttons: '',
    lining: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParamsFormData({ ...paramsFormData, [e.target.name]: e.target.value });
  };

  const handleCustomFormChange = (updatedFields) => {
    setParamsFormData((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  };

  const handleSaveSizesInputs = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(paramsFormData);
  };

  function sendMail(name, user, order) {
    Email.send({
      SecureToken: 'ef79f30f-8ef6-4205-979a-b8e46f36a527',
      To: user,
      From: 'maxkosh1994@gmail.com',
      Subject: 'Сообщение от команды Cape&Coat',
      Body: `Уважаемый(ая) ${name}, вы указали этот почтовый ящик (${user}) при оформлении заказа на сайте Cape&Coat. ${order}`,
    });
  }
  const emptyCart = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}cart/emptyCart/${user}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const re = await response.json();
    if (re.success) {
      setCartItemsList([]);
    }
    // TODO если корзина не удалилась
  };
  const createOrder = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}order/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const re = await response.json();
    if (re.message === 'Что-то пошло не так, попробуйте позже') {
      setOrderStatus(re.message);
      setTimeout(() => {
        setOrderStatus('');
      }, 2000);
    } else {
      setOrderStatus(re.message);
      // TODO либо убрать таймаут
      // но тогда будет меняться на долю секунды кнопка на "заказ создан блабла"
      setTimeout(() => {
        emptyCart();
        dispatch(getCartItems([]));
        router.push('/account/orders');
      }, 2000);
      sendMail(name, user, re.message);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await dispatch(getCartItemsThunk(user));
        setCartItemsList(cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartItems();
  }, [dispatch, user]);

  useEffect(() => {
    const jacketItems = cartItemsList.filter((item) => item.category_id === 3);
    if (cartItemsList.length > 2) {
      const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0);
      const discountPercentage = 0.05;
      const discountAmount = subtotal * discountPercentage;
      setDiscount(discountAmount);
      const updatedTotal = subtotal - discountAmount + deliveryCost;
      setCartTotal(updatedTotal);
    } else if (jacketItems.length >= 2) {
      const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0);
      const subtotalJackets = jacketItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
      const discountPercentage = 0.05;
      const discountAmount = subtotalJackets * discountPercentage;
      setDiscount(discountAmount);
      const updatedTotal = subtotal - discountAmount + deliveryCost;
      setCartTotal(updatedTotal);
    }
  }, [cartItemsList]);

  useEffect(() => {
    const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0);
    const updatedTotal = subtotal - discount + deliveryCost;
    setCartTotal(updatedTotal);
  }, [cartItemsList, discount, deliveryCost]);

  useEffect(() => {
    if (selectedDelivery === 'showroom') {
      setDeliveryCost(0);
      setShowAddressInputs(false);
    } else {
      setDeliveryCost(300);
      setShowAddressInputs(true);
      // TODO подключить API почты россии для расчета доставки?
    }
  }, [selectedDelivery]);

  const handleDeleteItemFromCart = async (itemId) => {
    try {
      const data = { itemId, user };
      await dispatch(delCartItemThunk(data));
      const updatedCartItems = await dispatch(getCartItemsThunk(user));
      setCartItemsList(updatedCartItems);
    } catch (err) {
      console.log(err);
      setDelError('Не получилось удалить товар, попробуйте позже.');
    }
  };
  const handleDisplaySizesForm = (itemId: number) => {
    setShowParamsForm((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  // const handleSaveSizesInputs = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDeliveryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDelivery(e.target.value);
  };

  const handleCreateOrder = () => {
    if (selectedDelivery !== '') {
      let addressString;
      if (selectedDelivery === 'post') {
        addressString = `${addressInputs.city}, ${addressInputs.street} дом ${addressInputs.number}, квартира ${addressInputs.flat}`;
      } else {
        addressString = 'Нижний Новгород, ул. Малая Покровская, 20';
      }
      const orderData = {
        user,
        cartItemsList,
        cartTotal,
        addressString,
        commentsInput,
      };
      if (addressString.length > 18) {
        createOrder(orderData);
      } else {
        setOrderStatus('Пожалуйста, заполните адрес доставки');
        setTimeout(() => {
          setOrderStatus('');
        }, 2000);
      }
    } else {
      setOrderStatus('Пожалуйста, выберите способ доставки');
      setTimeout(() => {
        setOrderStatus('');
      }, 2000);
    }
  };

  const handleCommentChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCommentsInput(e.target.value);
  };

  const handlePromocodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value.trim());
  };

  const handleApplyPromocode = async (e: MouseEvent<HTMLButtonElement>) => {
    const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0);
    if (promocode && !promoUsed) {
      const isValidPromo = await fetch(
        `${process.env.NEXT_PUBLIC_URL}cart/promocode/${promocode}`
      );
      const response = await isValidPromo.json();
      if (isValidPromo.status === 200) {
        if (discount === 0) {
          const disc = (response.percent / 100) * subtotal;
          setDiscount(disc);
          setPromoUsed(true);
        } else {
          const disc = discount + (response.percent / 100) * subtotal;
          setDiscount(disc);
          setPromoUsed(true);
        }
      } else {
        setPromocodeErr(response);
        setTimeout(() => {
          setPromocodeErr('');
        }, 1000);
        setCartTotal(subtotal);
      }
    } else if (promoUsed) {
      setPromocodeErr('Вы уже использовали промокод');
      setTimeout(() => {
        setPromocodeErr('');
      }, 1000);
    } else {
      setPromocodeErr('Вы не ввели промокод');
      setTimeout(() => {
        setPromocodeErr('');
      }, 1000);
    }
  };

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
          <p className="empty-cart-msg">
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
                  {cartItemsList.map((item) => (
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
                          <button
                            className={styles.basketItemDeleteButton}
                            type="button"
                            onClick={() => handleDeleteItemFromCart(item.id)}
                          >
                            <Image
                              src="/delicon.png"
                              alt="Удалить"
                              fill={true}
                            />
                          </button>
                        </div>
                        <div className={styles.basketItemContent}>
                          <div className={styles.basketItemProperties}>
                            <div>Артикул: {item.article}</div>
                          </div>
                        </div>
                        <div className={styles.basketItemContent}>
                          <div className={styles.itemPrices}>
                            <span className={styles.itemPricesPrice}>
                              {item.price.toLocaleString()} &#8381;
                            </span>
                          </div>
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
                          //     {есть мерки в бд ? (
                          //       мерки
                          //       <button
                          //         className={styles.showSizeFormBtn}
                          //         onClick={() => handleDisplaySizesForm(item.id)}
                          //       >
                          //         Изменить мерки
                          //       </button>
                          //     )
                          //   :(

                          //   )
                          // }
                          <>
                            <button
                              className={styles.showSizeFormBtn}
                              onClick={() => handleDisplaySizesForm(item.id)}
                            >
                              Ввести мерки
                            </button>
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
                                      Желаемая длина изделия
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
                                  {item.category_id === 4 && (
                                    <TrousersSizeForm
                                      onTrousersSizeChange={
                                        handleCustomFormChange
                                      }
                                    />
                                  )}
                                  {item.category_id === 1 && (
                                    <TrenchSizeForm
                                      itemId={item.id}
                                      onTrenchSizeChange={
                                        handleCustomFormChange
                                      }
                                    />
                                  )}
                                  {item.category_id === 2 && (
                                    <CoatSizeForm
                                      itemId={item.id}
                                      onCoatSizeChange={handleCustomFormChange}
                                    />
                                  )}
                                  {item.category_id === 5 && (
                                    <FurCoatSizeForm
                                      itemId={item.id}
                                      onFurCoatSizeChange={
                                        handleCustomFormChange
                                      }
                                    />
                                  )}
                                </div>
                                <button
                                  className={styles.sizesFormBtn}
                                  onClick={handleSaveSizesInputs}
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

                <section
                  className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}
                >
                  <h2 className={styles.headerItemCart}>
                    Комментарии к заказу
                  </h2>
                  <div className={`${styles.formBlock} ${styles.commentCart}`}>
                    <label
                      className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
                      // modelmodifiers="[object Object]"
                    >
                      <div className={styles.formControl}>
                        <label
                          className={`${styles.formControlLabel} ${styles.formControlLabelVisible}`}
                        >
                          Укажите желаемую длину изделия или другие пожелания
                        </label>
                        <textarea
                          className={`${styles.commentInput} ${styles.formInput}`}
                          role="text"
                          title="Комментарии"
                          placeholder=""
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
                          Доставка СДЭК
                        </span>
                        <span className={styles.checkboxDescription}>
                          <strong>от 300 рублей</strong>, от 3 дней
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
                <div className={styles.orderSummary}>
                  <div className={styles.summary}>
                    <div className={styles.orderSummaryRow}>
                      <span>Товары ({cartItemsList.length}):</span>
                      <div className={styles.itemPrices}>
                        {!promocodeErr && discount ? (
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
                        <span className={styles.itemPricesPrice}>
                          {discount.toLocaleString()} &#8381;
                        </span>
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
