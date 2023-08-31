import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { getCartItems } from '@/app/cartSlice';
import {
  delCartItemThunk,
  emptyCartThunk,
  getCartItemsThunk,
} from '@/app/thunkActionsCart';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import {
  IAddressInputs,
  ICustomFormInputs,
  IOrderData,
  IParamsFormData,
  IPersonalData,
  IShowParamsForm,
} from '@/TypeScript/checkoutTypes';
import { ISingleItem } from '@/app/types/cartTypes';

export const useCartControl = () => {
  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const name = useAppSelector((state: RootState) => state.sessionSlice.name);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // товары в корзине
  const [cartItemsList, setCartItemsList] = useState<ISingleItem[]>([]);
  // ошибка при удалении товара из корзины
  const [delError, setDelError] = useState<string>('');
  // сумма корзины
  const [cartTotal, setCartTotal] = useState<number>(0);
  // введенный промокод
  const [promocode, setPromocode] = useState<string>('');
  // промокод для отправки на бек
  const [dbPc, setDbPc] = useState<string>('');
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

  // Очищает корзину при успешном заказе
  // тип промис войд потому что асинхронная и ничего не возвр
  const emptyCart = async (): Promise<void> => {
    const empty = await dispatch(emptyCartThunk(user));
    if (empty === 200) {
      setCartItemsList([]);
    }
  };

  // стукается через санку на бек, грузит список товаров добавленных в корзину
  const fetchCartItems = async (): Promise<void> => {
    try {
      const cartItems = await dispatch(getCartItemsThunk());
      setCartItemsList(cartItems);
    } catch (err) {
      console.log(err);
    }
  };

  const countCartTotal = (): void => {
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
  };

  // отрабатыват по клику на иконку удаления
  // удаляет из массива и с бека через санку
  const handleDeleteItemFromCart = async (itemId: number): Promise<void> => {
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
  const handleDisplaySizesForm = (index: number, itemId: number): void => {
    setShowParamsForm((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  // записывает изменения в форме персональных данных (если клиент не залогинен)
  const handlePersonalDataInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // записывает изменения в инпутах формы введения мерок
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setParamsFormData({ ...paramsFormData, [e.target.name]: e.target.value });
  };

  // дозаписывает изменения в кастомизированных формах
  // имеется в виду для брюк добавляет седло
  // для пальто и шуб утепление, etc
  const handleCustomFormChange = (updatedFields: ICustomFormInputs): void => {
    setParamsFormData((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  };

  // отслеживает изменения в инпутах формы адреса доставки
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddressInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // отслеживает чекбокс Срочный пошив
  const handleUrgentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUrgentMaking(e.target.checked);
  };

  // отслеживает радио кнопки доставки - шоурум или сдек
  const handleDeliveryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDelivery(e.target.value);
  };

  // рассчитывает стоимость доставки, если в шоурум - 0, если по адресу считает 300
  const countDeliveryCost = (): void => {
    if (selectedDelivery === 'showroom') {
      setDeliveryCost(0);
      setShowAddressInputs(false);
    } else {
      setDeliveryCost(300);
      setShowAddressInputs(true);
    }
  };

  // отслеживает изменения в блоке Комментарии
  const handleCommentChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setCommentsInput(e.target.value);
  };

  // отрабатывает по клику на СОХРАНИТЬ при введении мерок
  const handleSaveSizesInputs = async (
    index: number,
    itemId: number
  ): Promise<void> => {
    setParamsFormData((prevState) => ({
      ...prevState,
      itemId,
    }));
    console.log(paramsFormData);

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

  // отслеживает инпут промокода
  const handlePromocodeChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setPromocode(e.target.value.trim());
  };

  // отрабатывает по нажатию на ПРИМЕНИТЬ (промокод)
  const handleApplyPromocode = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    // считаем подытог корзины
    const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0);
    // если введен промокод и это первый введенный промокод
    if (promocode && !promoUsed) {
      // проверяем на беке есть ли такой промокод
      const isValidPromo = await fetch(
        `${process.env.NEXT_PUBLIC_URL}cart/promocode/${promocode}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const response = await isValidPromo.json();
      if (isValidPromo.status === 200) {
        setDbPc(promocode);
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

  // Стучится на бек и создает заказ, если все проверки прошли
  const createOrder = async (data: IOrderData): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}order/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const re = await response.json();
      console.log(re);
      if (re.message === 'Что-то пошло не так, попробуйте позже') {
        // если ошибка на беке
        setOrderStatus(re.message);
        setTimeout(() => {
          setOrderStatus('');
        }, 2000);
      } else if (re.message === 'Вы уже использовали этот промокод') {
        setOrderStatus(re.message);
        setPromoUsed(false);
        setDiscount(0);
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
    } catch (err) {
      console.log(err);
    }
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
        addressString = 'Нижний Новгород, ул. Ильинская, 79';
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
              cartItem.height !== '' &&
              cartItem.length !== '' &&
              cartItem.sleeve !== '' &&
              cartItem.bust !== '' &&
              cartItem.waist !== '' &&
              cartItem.hips !== ''
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
              dbPc,
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
              dbPc,
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

  return {
    cartItemsList,
    setCartItemsList,
    setShowParamsForm,
    showParamsForm,
    paramsFormData,
    setParamsFormData,
    commentsInput,
    setCommentsInput,
    selectedDelivery,
    setSelectedDelivery,
    deliveryCost,
    setDeliveryCost,
    showAddressInputs,
    setShowAddressInputs,
    addressInputs,
    setAddressInputs,
    personalData,
    setPersonalData,
    delError,
    setDelError,
    orderStatus,
    setOrderStatus,
    promoUsed,
    setPromoUsed,
    promocode,
    setPromocode,
    dbPc,
    setDbPc,
    promocodeErr,
    setPromocodeErr,
    discountPercent,
    setDiscountPercent,
    discount,
    setDiscount,
    twoItemDiscount,
    setTwoItemDiscount,
    urgencyFee,
    setUrgencyFee,
    urgentMaking,
    setUrgentMaking,
    cartTotal,
    setCartTotal,
    userParams,
    setUserParams,
    emptyCart,
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
    handleCustomFormChange,
    handleUrgentChange,
    handleDeliveryChange,
    handleCommentChange,
    countCartTotal,
    handleCreateOrder,
    createOrder,
  };
  // setState тоже можно возвращать и юзать в компоненте снаружи
};
