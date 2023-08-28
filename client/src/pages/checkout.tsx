import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  delCartItemThunk,
  emptyCartThunk,
  getCartItemsThunk,
} from '../app/thunkActionsCart';
import { getCartItems } from '../app/cartSlice';
import styles from '../styles/Checkout.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import TrousersSizeForm from '@/components/Cart/trousersSizeForm';
import TrenchSizeForm from '@/components/Cart/trenchSizeForm';
import CoatSizeForm from '@/components/Cart/coatSizeForm';
import FurCoatSizeForm from '@/components/Cart/furCoatSizeForm';
import LikeButton from '@/components/likeButton/LikeButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BackToTopArrow from '@/components/ToTopArrow/ToTopArrow';
import { RootState } from '@/app/store';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ISingleItem } from '@/app/types/cartTypes';
import {
  IAddressInputs,
  ICustomFormInputs,
  IOrderData,
  IParamsFormData,
  IPersonalData,
  IShowParamsForm,
} from '@/TypeScript/checkoutTypes';

export default function CheckoutPage() {
  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const name = useAppSelector((state: RootState) => state.sessionSlice.name);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // товары в корзине
  const [cartItemsList, setCartItemsList] = useState<ISingleItem[]>([]);
  // ошибка при удалении товара из корзины
  const [delError, setDelError] = useState<string>('');
  // сумма корзины
  const [cartTotal, setCartTotal] = useState<number>(0);
  // введенный промокод
  const [promocode, setPromocode] = useState<string>('');
  // использовал ли юзер промокод
  const [promoUsed, setPromoUsed] = useState<boolean>(false);
  // ошибка с промокодом
  const [promocodeErr, setPromocodeErr] = useState<string>('');
  // размер скидки
  const [discount, setDiscount] = useState<number>(0);
  // размер скидки в %
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  // скидка за 2+ товара
  const [twoItemDiscount, setTwoItemDiscount] = useState<number>(0);
  // комментарии к заказу
  const [commentsInput, setCommentsInput] = useState<string>('');
  // ошибка заказа или статус
  const [orderStatus, setOrderStatus] = useState<string>('');
  // какая выбрана доставка
  const [selectedDelivery, setSelectedDelivery] = useState<string>('showroom');
  // отображать или нет форму адреса
  const [showAddressInputs, setShowAddressInputs] = useState<boolean>(false);
  // чекбокс срочного пошива
  const [urgentMaking, setUrgentMaking] = useState<boolean>(false);
  // стоимость срочного пошива
  const [urgencyFee, setUrgencyFee] = useState<number>(0);
  const [personalData, setPersonalData] = useState<IPersonalData>({
    name: '',
    email: '',
    number: '',
  });
  // форма адреса
  const [addressInputs, setAddressInputs] = useState<IAddressInputs>({
    city: '',
    street: '',
    number: '',
    flat: '',
  });
  // стоимость доставки
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  // отображать форму мерок, записывает индекс в массиве
  const [showParamsForm, setShowParamsForm] = useState<IShowParamsForm>({});
  // введенные в форму мерки
  const [paramsFormData, setParamsFormData] = useState<IParamsFormData>({
    itemId: 0,
    height: '',
    length: '',
    sleeve: '',
    bust: '',
    waist: '',
    hips: '',
    saddle: '',
    loops: false,
    buttons: '',
    lining: '',
  });
  // записывет параметры товаров по индексу в массиве
  const [userParams, setUserParams] = useState<string[]>(
    Array(cartItemsList.length).fill('')
  );

  //!  отправляет письмо с подтверждением заказа
  function sendMail(name: string, user: string, order: string) {
    Email.send({
      SecureToken: 'ef79f30f-8ef6-4205-979a-b8e46f36a527',
      To: user,
      From: 'maxkosh1994@gmail.com',
      Subject: 'Сообщение от команды Cape&Coat',
      Body: `Уважаемый(ая) ${name}, вы указали этот почтовый ящик (${user}) при оформлении заказа на сайте Cape&Coat. ${order}`,
    });
  }

  // Очищает корзину при успешном заказе
  const emptyCart = async () => {
    const empty = await dispatch(emptyCartThunk(user));
    if (empty === 200) {
      setCartItemsList([]);
    }
  };

  // Стучится на бек и создает заказ, если все проверки прошли
  const createOrder = async (data: IOrderData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}order/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const re = await response.json();
    if (re.message === 'Что-то пошло не так, попробуйте позже') {
      // если ошибка на беке
      setOrderStatus(re.message);
      setTimeout(() => {
        setOrderStatus('');
      }, 2000);
    } else {
      // если все ок - очищает корзину, массив в редаксе и редиректит на спасибку
      emptyCart();
      dispatch(getCartItems([]));
      router.push('/thankyou');
      sendMail(name, user, re.message);
    }
  };

  // стукается через санку на бек, грузит список товаров добавленных в корзину
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await dispatch(getCartItemsThunk());
        setCartItemsList(cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartItems();
  }, [dispatch, user]);

  // подсчет ИТОГО заказа
  useEffect(() => {
    const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0);
    // фильтруем только жакеты
    const jacketItems = cartItemsList.filter((item) => item.category_id === 3);

    if (cartItemsList.length > 2) {
      // если больше 2х товаров в корзине скидка 5%
      const discountPercentage = 0.05;
      // считаем размер скидки
      const discountAmount = subtotal * discountPercentage;
      // устанавливаем размер скидки для двух+ товаров
      setTwoItemDiscount(discountAmount);
      // если есть скидка по промокоду, то считаем с учетом той скидки
      if (discount) {
        // считает размер новой скидки по ее проценту
        const newDisc = discountPercent * subtotal;
        // записываем размер скидки в стейт
        setDiscount(newDisc);
        // пересчитываем и устанавливаем новый тотал
        const updTotal = subtotal - newDisc - discountAmount + deliveryCost;
        setCartTotal(updTotal);
        if (urgentMaking) {
          // если срочный пошив, считает 20% от корзины и устанавливаем размер стоимости пошива
          const twentyPercentOfSubtotal = (subtotal * 20) / 100;
          setUrgencyFee(twentyPercentOfSubtotal);
          // обновляем ИТОГО с учетом скидок, срочного пошива и доставки
          const updatedTotal =
            subtotal -
            newDisc -
            discountAmount +
            deliveryCost +
            twentyPercentOfSubtotal;
          setCartTotal(updatedTotal);
        } else {
          // если несрочно - то считаем тотал с учетом скидок и доставки
          const updatedTotal =
            subtotal - newDisc - discountAmount + deliveryCost;
          setDiscount(newDisc);
          setCartTotal(updatedTotal);
          setUrgencyFee(0);
        }
      } else {
        // если скидки нет (от промокода), то считаем так же срочную и несрочную доставку
        if (urgentMaking) {
          const twentyPercentOfSubtotal = (subtotal * 20) / 100;
          setUrgencyFee(twentyPercentOfSubtotal);
          const updatedTotal =
            subtotal -
            discount -
            discountAmount +
            deliveryCost +
            twentyPercentOfSubtotal;
          setCartTotal(updatedTotal);
        } else {
          const updatedTotal =
            subtotal - discount - discountAmount + deliveryCost;
          setCartTotal(updatedTotal);
          setUrgencyFee(0);
        }
      }
    } else if (jacketItems.length > 2) {
      // если больше 2 товаров категории жакет, то подсчитываем их стоимость
      const subtotalJackets = jacketItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
      // считаем размер скидки 5% и пишем в стейт
      const discountPercentage = 0.05;
      const discountAmount = subtotalJackets * discountPercentage;
      setTwoItemDiscount(discountAmount);
      if (discount) {
        // те же расчеты если есть скидка по промокоду
        const newDisc = discountPercent * subtotal;
        setDiscount(newDisc);
        const updTotal = subtotal - newDisc - discountAmount + deliveryCost;
        setCartTotal(updTotal);
        if (urgentMaking) {
          // те же расчеты если срочный пошив
          const twentyPercentOfSubtotal = (subtotal * 20) / 100;
          setUrgencyFee(twentyPercentOfSubtotal);
          const updatedTotal =
            subtotal -
            newDisc -
            discountAmount +
            deliveryCost +
            twentyPercentOfSubtotal;
          setCartTotal(updatedTotal);
        } else {
          // те же расчеты если несрочный пошив
          const updatedTotal =
            subtotal - newDisc - discountAmount + deliveryCost;
          setDiscount(newDisc);
          setCartTotal(updatedTotal);
          setUrgencyFee(0);
        }
      } else {
        // если нет скидки по промокоду
        if (urgentMaking) {
          // те же расчеты если срочный пошив

          const twentyPercentOfSubtotal = (subtotal * 20) / 100;
          setUrgencyFee(twentyPercentOfSubtotal);
          const updatedTotal =
            subtotal -
            discount -
            discountAmount +
            deliveryCost +
            twentyPercentOfSubtotal;
          setCartTotal(updatedTotal);
        } else {
          // те же расчеты несрочный пошив
          const updatedTotal =
            subtotal - discount - discountAmount + deliveryCost;
          setCartTotal(updatedTotal);
          setUrgencyFee(0);
        }
      }
    } else {
      // рассчитываем итоговую стоимость, если нет автоматических скидок по 2+ товарам категории
      setTwoItemDiscount(0);
      if (discount) {
        // те же расчеты с учетом скидки по промокоду
        const newDisc = discountPercent * subtotal;
        setDiscount(newDisc);
        const updTotal = subtotal - newDisc + deliveryCost;
        setCartTotal(updTotal);
        if (urgentMaking) {
          // те же расчеты со срочным пошивом
          const twentyPercentOfSubtotal = (subtotal * 20) / 100;
          setUrgencyFee(twentyPercentOfSubtotal);
          const updatedTotal =
            subtotal - discount + deliveryCost + twentyPercentOfSubtotal;
          setCartTotal(updatedTotal);
        } else {
          // те же расчеты с несрочным пошивом
          const updatedTotal = subtotal - discount + deliveryCost;
          setCartTotal(updatedTotal);
          setUrgencyFee(0);
        }
      } else {
        // те же расчеты когда нет скидки по промокоду
        if (urgentMaking) {
          // те же расчеты со срочным пошивом
          const twentyPercentOfSubtotal = (subtotal * 20) / 100;
          setUrgencyFee(twentyPercentOfSubtotal);
          const updatedTotal =
            subtotal - discount + deliveryCost + twentyPercentOfSubtotal;
          setCartTotal(updatedTotal);
        } else {
          // те же расчеты с несрочным пошивом
          const updatedTotal = subtotal + deliveryCost;
          setCartTotal(updatedTotal);
          setUrgencyFee(0);
        }
      }
    }
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
    // рассчитывает стоимость доставки, если в шоурум - 0, если по адресу считает 300
    if (selectedDelivery === 'showroom') {
      setDeliveryCost(0);
      setShowAddressInputs(false);
    } else {
      setDeliveryCost(300);
      setShowAddressInputs(true);
      // TODO подключить API почты россии для расчета доставки?
    }
  }, [selectedDelivery]);

  // отрабатыват по клику на иконку удаления
  // удаляет из массива и с бека через санку
  const handleDeleteItemFromCart = async (itemId: number) => {
    try {
      const data = { itemId, user };
      await dispatch(delCartItemThunk(data));
      const updatedCartItems = await dispatch(getCartItemsThunk());
      setCartItemsList(updatedCartItems);
    } catch (err) {
      console.log(err);
      setDelError('Не получилось удалить товар, попробуйте позже.');
    }
  };

  // отображает форму введения мерок под товаром
  const handleDisplaySizesForm = (index: number, itemId: number) => {
    setShowParamsForm((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  // записывает изменения в форме персональных данных (если клиент не залогинен)
  const handlePersonalDataInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // записывает изменения в инпутах формы введения мерок
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParamsFormData({ ...paramsFormData, [e.target.name]: e.target.value });
  };

  // дозаписывает изменения в кастомизированных формах
  // имеется в виду для брюк добавляет седло
  // для пальто и шуб утепление, etc
  const handleCustomFormChange = (updatedFields: ICustomFormInputs) => {
    setParamsFormData((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  };

  // отрабатывает по клику на СОХРАНИТЬ при введении мерок
  const handleSaveSizesInputs = async (index: number, itemId: number) => {
    setParamsFormData((prevState) => ({
      ...prevState,
      itemId: itemId,
    }));

    // записывает мерки к товару в CartItems
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}cart/measures/${itemId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(paramsFormData),
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      // выводит мерки, если всё ок
      // и прячет форму
      const userParams = `Ваш рост: ${res.height}см, длина изделия: ${res.length}см, длина рукава: ${res.sleeve}см, объем груди: ${res.bust}см, объем талии: ${res.waist}см, объем бедер: ${res.hips}см`;
      setUserParams((prevTexts) => {
        const updatedTexts = [...prevTexts];
        updatedTexts[index] = userParams;
        return updatedTexts;
      });
      setShowParamsForm({});
    }
  };

  // отслеживает изменения в инпутах формы адреса доставки
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // отслеживает чекбокс Срочный пошив
  const handleUrgentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrgentMaking(e.target.checked);
  };

  // отслеживает радио кнопки доставки - шоурум или сдек
  const handleDeliveryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDelivery(e.target.value);
  };

  // отрабатывает по нажатию на ОФОРМИТЬ
  const handleCreateOrder = () => {
    // проверяет введен ли адрес
    if (selectedDelivery !== '') {
      let addressString;
      // если доставка выбрана сдек, то склеивает данные в строку
      if (selectedDelivery === 'post') {
        addressString = `${addressInputs.city}, ${addressInputs.street} дом ${addressInputs.number}, квартира ${addressInputs.flat}`;
      } else {
        // если в шоурум, то записывает в переменную адрес шоурума
        addressString = 'Нижний Новгород, ул. Малая Покровская, 20';
      }

      // проверяем заполнил ли клиент мерки для всех товаров на пошив
      const isMeasuresAdded = cartItemsList
        .filter((item) => !item.in_stock)
        .every((item) => {
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // TODO ошибка типизации
          const cartItems = item.Carts.map((cart) => cart.CartItem);
          return cartItems.every((cartItem) => {
            return (
              cartItem.height !== null &&
              cartItem.length !== null &&
              cartItem.sleeve !== null &&
              cartItem.bust !== null &&
              cartItem.waist !== null &&
              cartItem.hips !== null
            );
          });
        });
      // если адрес корректный
      if (addressString.length > 18) {
        // проверяем мерки
        if (!isMeasuresAdded) {
          setOrderStatus('Пожалуйста, введите все мерки для пошива изделия');
          setTimeout(() => {
            setOrderStatus('');
          }, 2000);
        } else {
          // если адрес и мерки в порядке

          // создаем объект, который передадим на бек,
          // в нем email клиента, сумма заказа, адрес, комментарии и срочный ли пошив
          if (user) {
            // если клиент залогинен, собираем объект
            const orderData = {
              user,
              cartTotal,
              addressString,
              commentsInput,
              urgentMaking,
            };
            // вызываем функцию создания заказа
            createOrder(orderData);
          } else {
            // если клиент не залогинен - собираем объект с данными из формы персональных данных
            const orderData = {
              personalData,
              cartTotal,
              addressString,
              commentsInput,
              urgentMaking,
            };
            // вызываем функцию создания заказа
            createOrder(orderData);
          }
        }
      } else {
        // если адрес доставки некорректный
        setOrderStatus;
        setOrderStatus('Пожалуйста, заполните адрес доставки');
        setTimeout(() => {
          setOrderStatus('');
        }, 2000);
      }
    } else {
      // если не выбран способ доставки
      setOrderStatus('Пожалуйста, выберите способ доставки');
      setTimeout(() => {
        setOrderStatus('');
      }, 2000);
    }
  };

  // отслеживает изменения в блоке Комментарии
  const handleCommentChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCommentsInput(e.target.value);
  };

  // отслеживает инпут промокода
  const handlePromocodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value.trim());
  };

  // отрабатывает по нажатию на ПРИМЕНИТЬ (промокод)
  const handleApplyPromocode = async (e: MouseEvent<HTMLButtonElement>) => {
    // считаем подытог корзины
    const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0);
    // если введен промокод и это первый введенный промокод
    if (promocode && !promoUsed) {
      // проверяем на беке есть ли такой промокод
      const isValidPromo = await fetch(
        `${process.env.NEXT_PUBLIC_URL}cart/promocode/${promocode}`
      );
      const response = await isValidPromo.json();
      if (isValidPromo.status === 200) {
        // если такой промокод есть, то считаем скидку
        if (discount === 0) {
          // если до этого была ноль
          setDiscountPercent(response.percent / 100);
          const disc = (response.percent / 100) * subtotal;
          setDiscount(disc);
          setPromoUsed(true);
          setPromocode('');
        } else {
          // если до этого уже была скидка
          setDiscountPercent(response.percent / 100);
          // плюсуем существующую скидку
          const disc = discount + (response.percent / 100) * subtotal;
          setDiscount(disc);
          setPromoUsed(true);
          setPromocode('');
        }
      } else {
        // если ошибка с бека
        setPromocodeErr(response);
        setTimeout(() => {
          setPromocodeErr('');
        }, 1000);
        setCartTotal(subtotal);
      }
    } else if (promoUsed) {
      // если пользователь уже ввел 1 промокод
      setPromocodeErr('Вы уже использовали промокод');
      setTimeout(() => {
        setPromocodeErr('');
      }, 1000);
    } else {
      // если отправляет пустую строку
      setPromocodeErr('Вы не ввели промокод');
      setTimeout(() => {
        setPromocodeErr('');
      }, 1000);
    }
  };
  console.log(cartItemsList);

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
