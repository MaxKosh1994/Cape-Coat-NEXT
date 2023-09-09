import React, {
  ChangeEvent,
  MouseEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useRouter } from 'next/router';
import { delCartItem, emptyCart, getCartItems } from '@/app/cartSlice';
import {
  delCartItemThunk,
  emptyCartThunk,
  getCartItemsByIdThunk,
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
  // const [cartItemsList, setCartItemsList] = useState<ISingleItem[]>([]);
  const cartItemsList = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
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
  // стоимость утепления
  const [liningCost, setLiningCost] = useState<number>(0);
  // форма для незарегистрированного пользователя
  const [personalData, setPersonalData] = useState<IPersonalData>({
    name: '',
    email: '',
    phone: '',
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
  const [userParams, setUserParams] = useState<string[]>([]);
  const userParamsRef = useRef(userParams);

  // стукается через санку на бек, грузит список товаров добавленных в корзину
  const fetchCartItems = async (): Promise<void> => {
    try {
      if (!user) {
        const itemsLocal = JSON.parse(localStorage.getItem('cartItems'));
        await dispatch(getCartItemsByIdThunk(itemsLocal));
      } else {
        await dispatch(getCartItemsThunk());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const countCartTotal = (): void => {
    let liningCost = 0;
    // counting subtotal of all items adding 1400 to the items with lining
    const subtotal = cartItemsList.reduce((sum, item) => {
      const localData = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (user) {
        if (item?.Carts[0]?.CartItem?.lining !== '') {
          liningCost += 1400;
          return sum + item.price + 1400;
        } else {
          return sum + item.price;
        }
      } else {
        if (
          localData?.find((data) => data.id === item.id)?.lining &&
          localData?.find((data) => data.id === item.id).lining !== ''
        ) {
          liningCost += 1400;
          return sum + item.price + 1400;
        } else {
          return sum + item.price;
        }
      }
    }, 0);
    setLiningCost(liningCost);
    if (cartItemsList.length > 2) {
      // 5% discount for >2 items in cart from all item prices + delivery
      const threePlusItemsDiscount = (subtotal + deliveryCost) * 0.05;
      setTwoItemDiscount(threePlusItemsDiscount);
      // upds total - discount for >2 items + cost of delivery
      const updTotal = subtotal + deliveryCost - threePlusItemsDiscount;
      setCartTotal(updTotal);
      // if there is a promocode discount
      if (discountPercent > 0) {
        // counts new total with discount from promo
        setCartTotal(updTotal * (1 - discountPercent));
        // sets discount size off of subtotal and deliverycost
        setDiscount(discountPercent * updTotal);
        if (urgentMaking) {
          // counts +20% on the total of the cart after >2 item discount
          setUrgencyFee(subtotal * 0.2);
          // counts new total from total with >2 discount + discount from promo + urgency fee + delivery
          setCartTotal(
            updTotal * (1 - discountPercent) + (urgencyFee - urgencyFee * 0.05)
          );
          // count discount size from total before any discount + fee + delivery
          setDiscount(discountPercent * (updTotal + urgencyFee));
        }
      }
      if (urgentMaking && discountPercent <= 0) {
        // counts +20% on the total of the cart before >2 item discount
        setUrgencyFee(subtotal * 0.2);
        setCartTotal(updTotal + (urgencyFee - urgencyFee * 0.05));
        setTwoItemDiscount(threePlusItemsDiscount + urgencyFee * 0.05);
      }
    } else {
      setTwoItemDiscount(0);
      const updTotal = subtotal + deliveryCost;
      setCartTotal(updTotal);

      if (discountPercent > 0) {
        setCartTotal(updTotal * (1 - discountPercent));
        setDiscount(discountPercent * updTotal);
        if (urgentMaking) {
          setUrgencyFee(subtotal * 0.2);
          setCartTotal((updTotal + urgencyFee) * (1 - discountPercent));
          setDiscount(discountPercent * (updTotal + urgencyFee));
        }
      }
      if (urgentMaking && discountPercent <= 0) {
        setUrgencyFee(subtotal * 0.2);
        setCartTotal(updTotal + urgencyFee);
      }
    }
  };

  useEffect(() => {
    // стукается через санку на бек, грузит список товаров добавленных в корзину
    userParamsRef.current = userParams;
    fetchCartItems();
  }, [dispatch, user, userParamsRef, showParamsForm]);

  useEffect(() => {
    if (cartItemsList.length > 0) {
      setUserParams(Array(cartItemsList.length).fill(''));
    }
  }, [cartItemsList]);

  useEffect(() => {
    // подсчет ИТОГО заказа
    countCartTotal();
  }, [
    cartItemsList,
    discountPercent,
    discount,
    twoItemDiscount,
    deliveryCost,
    urgentMaking,
    urgencyFee,
    dispatch,
    cartTotal,
    userParamsRef,
  ]);

  useEffect(() => {
    // подсчет стоимости доставки в зависимости от почта\шоурум
    countDeliveryCost();
  }, [selectedDelivery]);

  // отрабатыват по клику на иконку удаления
  // удаляет из массива и с бека через санку
  const handleDeleteItemFromCart = async (itemId: number): Promise<void> => {
    try {
      if (user) {
        const data = { itemId, user };
        await dispatch(delCartItemThunk(data));
        await dispatch(getCartItemsThunk());
      } else {
        await dispatch(delCartItem(itemId));
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        await dispatch(getCartItemsByIdThunk(updatedCartItems));
      }
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
      itemId: itemId,
    }));
    console.log(paramsFormData);
    if (!user) {
      // введенные мерки сохраняются в локалсторедж к соответствующим товарам
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const itemToUpdate = cartItems.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.height = paramsFormData.height || '';
        itemToUpdate.length = paramsFormData.length || '';
        itemToUpdate.sleeve = paramsFormData.sleeve || '';
        itemToUpdate.bust = paramsFormData.bust || '';
        itemToUpdate.waist = paramsFormData.waist || '';
        itemToUpdate.hips = paramsFormData.hips || '';
        itemToUpdate.saddle = paramsFormData.saddle || '';
        itemToUpdate.loops = paramsFormData.loops || false;
        itemToUpdate.buttons = paramsFormData.buttons || '';
        itemToUpdate.lining = paramsFormData.lining || '';
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // сохраняет параметры для отображения
      const userParams = `Ваш рост: ${
        paramsFormData.height
      }см, длина изделия: ${paramsFormData.length}см, длина рукава: ${
        paramsFormData.sleeve
      }см, объем груди: ${paramsFormData.bust}см, объем талии: ${
        paramsFormData.waist
      }см, объем бедер: ${paramsFormData.hips}см${
        paramsFormData.saddle ? `, седло: ${paramsFormData.saddle}` : ''
      }${paramsFormData.lining ? `, утепление: ${paramsFormData.lining}` : ''}${
        paramsFormData.buttons ? `, фурнитура: ${paramsFormData.buttons}` : ''
      }${paramsFormData.loops ? `, со шлёвками` : ''}`;
      setUserParams((prevTexts) => {
        const updatedTexts = [...prevTexts];
        updatedTexts[index] = userParams;
        return updatedTexts;
      });
      setParamsFormData({});
      setShowParamsForm({});
    }
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
      const userParams = `Ваш рост: ${res.height}см, длина изделия: ${
        res.length
      }см, длина рукава: ${res.sleeve}см, объем груди: ${
        res.bust
      }см, объем талии: ${res.waist}см, объем бедер: ${res.hips}см${
        res.saddle ? `, седло: ${res.saddle}` : ''
      }${res.lining ? `, утепление: ${res.lining}` : ''}${
        res.buttons ? `, фурнитура: ${res.buttons}` : ''
      }${res.loops ? `, со шлёвками` : ''}`;
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
        setDiscountPercent(response.percent / 100);
        setPromoUsed(true);
        setPromocode('');
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
      console.log('ответ createOrder ===>', re);
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
        router.push('/thankyou');
        await dispatch(emptyCartThunk(user));
        await dispatch(emptyCart());
        localStorage.setItem('cartItems', JSON.stringify([]));
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
      let isMeasuresAdded;
      if (user) {
        console.log(cartItemsList.filter((item) => !item.in_stock));
        isMeasuresAdded = cartItemsList
          .filter((item) => !item.in_stock)
          .every((item) => {
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
      } else {
        // проверяем мерки в локалсторедж
        const localData = JSON.parse(localStorage.getItem('cartItems')) || [];
        isMeasuresAdded = localData
          .filter((item) => !item.in_stock)
          .every((oneItem) => {
            return (
              oneItem.height !== undefined &&
              oneItem.height !== '' &&
              oneItem.length !== undefined &&
              oneItem.length !== '' &&
              oneItem.sleeve !== undefined &&
              oneItem.sleeve !== '' &&
              oneItem.bust !== undefined &&
              oneItem.bust !== '' &&
              oneItem.waist !== undefined &&
              oneItem.waist !== '' &&
              oneItem.hips !== undefined &&
              oneItem.hips !== ''
            );
          });
      }
      // если адрес корректный
      if (addressString.length > 18) {
        // проверяем мерки
        // TODO раскомментить после дебага
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
            // createOrder(orderData);
          } else {
            // если клиент не залогинен - собираем объект с данными из формы персональных данных
            const itemsWithMeasurements = JSON.parse(
              localStorage.getItem('cartItems')
            );
            const orderData = {
              personalData,
              cartTotal,
              addressString,
              commentsInput,
              urgentMaking,
              dbPc,
              itemsWithMeasurements,
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
    liningCost,
    cartTotal,
    setCartTotal,
    userParams,
    setUserParams,
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
    userParamsRef,
  };
  // setState тоже можно возвращать и юзать в компоненте снаружи
};
