import React, {
  ChangeEvent,
  MouseEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useRouter } from 'next/router';
import { delCartItem, emptyCart } from '@/app/cartSlice';
import {
  delCartItemThunk,
  emptyCartThunk,
  getCartItemsByIdThunk,
  getCartItemsThunk,
} from '@/app/thunkActionsCart';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { ICustomFormInputs, IOrderData } from '@/TypeScript/checkoutTypes';
import { ILocalStorageCartItem } from '@/app/types/cartTypes';
import {
  setAddressInputs,
  setCartTotal,
  setCommentsInput,
  setDeliveryCost,
  setDiscount,
  setDiscountPercent,
  setLiningCost,
  setOrderStatus,
  setParamsFormData,
  setPersonalData,
  setPromoUsed,
  setPromocode,
  setPromocodeErr,
  setSelectedDelivery,
  setShowAddressInputs,
  setShowParamsForm,
  setTwoItemDiscount,
  setUrgencyFee,
  setUrgentMaking,
  setUserParams,
} from '@/app/cartControlSlice';

export const useCartControl = () => {
  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const name = useAppSelector((state: RootState) => state.sessionSlice.name);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItemsList = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  const {
    urgentMaking,
    urgencyFee,
    userParams,
    showParamsForm,
    commentsInput,
    paramsFormData,
    selectedDelivery,
    deliveryCost,
    showAddressInputs,
    addressInputs,
    personalData,
    promocode,
    promocodeErr,
    promoUsed,
    discount,
    discountPercent,
    twoItemDiscount,
    liningCost,
    cartTotal,
    orderStatus,
  } = useAppSelector((state) => state.cartControlSlice);

  // ошибка при удалении товара из корзины
  const [delError, setDelError] = useState<string>('');

  // промокод для отправки на бек
  const [dbPc, setDbPc] = useState<string>('');

  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const userParamsRef = useRef(userParams);

  // стукается через санку на бек, грузит список товаров добавленных в корзину
  const fetchCartItems = async (): Promise<void> => {
    try {
      if (!user) {
        const itemsLocal = localStorage.getItem('cartItems');
        if (itemsLocal !== null) {
          const parsedItems = JSON.parse(itemsLocal);
          await dispatch(getCartItemsByIdThunk(parsedItems));
        }
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
      const itemsLocal = localStorage.getItem('cartItems');
      const localData = itemsLocal ? JSON.parse(itemsLocal) : [];
      if (user) {
        if (item?.Carts[0]?.CartItem.lining !== '') {
          liningCost += 1400;
          return sum + item.price + 1400;
        } else {
          return sum + item.price;
        }
      } else {
        if (
          localData?.find((data: ILocalStorageCartItem) => data.id === item.id)
            ?.lining &&
          localData?.find((data: ILocalStorageCartItem) => data.id === item.id)
            .lining !== ''
        ) {
          liningCost += 1400;
          return sum + item.price + 1400;
        } else {
          return sum + item.price;
        }
      }
    }, 0);
    dispatch(setLiningCost(liningCost));
    if (cartItemsList.length > 2) {
      // 5% discount for >2 items in cart from all item prices + delivery
      const threePlusItemsDiscount = (subtotal + deliveryCost) * 0.05;
      dispatch(setTwoItemDiscount(threePlusItemsDiscount));
      // upds total - discount for >2 items + cost of delivery
      const updTotal = subtotal + deliveryCost - threePlusItemsDiscount;
      dispatch(setCartTotal(updTotal));
      // if there is a promocode discount
      if (discountPercent > 0) {
        // counts new total with discount from promo
        dispatch(setCartTotal(updTotal * (1 - discountPercent)));
        // sets discount size off of subtotal and deliverycost
        dispatch(setDiscount(discountPercent * updTotal));
        if (urgentMaking) {
          // counts +20% on the total of the cart after >2 item discount
          dispatch(setUrgencyFee(subtotal * 0.2));
          // counts new total from total with >2 discount + discount from promo + urgency fee + delivery
          dispatch(
            setCartTotal(
              updTotal * (1 - discountPercent) +
                (urgencyFee - urgencyFee * 0.05)
            )
          );
          // count discount size from total before any discount + fee + delivery
          dispatch(setDiscount(discountPercent * (updTotal + urgencyFee)));
        }
      }
      if (urgentMaking && discountPercent <= 0) {
        // counts +20% on the total of the cart before >2 item discount
        dispatch(setUrgencyFee(subtotal * 0.2));
        dispatch(setCartTotal(updTotal + (urgencyFee - urgencyFee * 0.05)));
        dispatch(
          setTwoItemDiscount(threePlusItemsDiscount + urgencyFee * 0.05)
        );
      }
    } else {
      dispatch(setTwoItemDiscount(0));
      const updTotal = subtotal + deliveryCost;
      dispatch(setCartTotal(updTotal));
      if (discountPercent > 0) {
        dispatch(setCartTotal(updTotal * (1 - discountPercent)));
        dispatch(setDiscount(discountPercent * updTotal));
        if (urgentMaking) {
          dispatch(setUrgencyFee(subtotal * 0.2));
          dispatch(
            setCartTotal((updTotal + urgencyFee) * (1 - discountPercent))
          );
          dispatch(setDiscount(discountPercent * (updTotal + urgencyFee)));
        }
      }
      if (urgentMaking && discountPercent <= 0) {
        dispatch(setUrgencyFee(subtotal * 0.2));
        dispatch(setCartTotal(updTotal + urgencyFee));
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
      const setParams = async () => {
        await dispatch(setUserParams(Array(cartItemsList.length).fill('')));
      };
      setParams();
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

        const itemsLocal = localStorage.getItem('cartItems');
        if (itemsLocal !== null) {
          const cartItems = JSON.parse(itemsLocal) || [];
          const updatedCartItems = cartItems.filter(
            (item: ILocalStorageCartItem) => item.id !== itemId
          );
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          await dispatch(getCartItemsByIdThunk(updatedCartItems));
        }
      }
    } catch (err) {
      console.log(err);
      setDelError('Не получилось удалить товар, попробуйте позже.');
    }
  };

  // отображает форму введения мерок под товаром
  const handleDisplaySizesForm = (index: number, itemId: number): void => {
    const updatedValue = !showParamsForm[itemId];
    dispatch(setShowParamsForm({ itemId, value: updatedValue }));
  };

  // записывает изменения в форме персональных данных (если клиент не залогинен)
  const handlePersonalDataInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(
      setPersonalData({ ...personalData, [e.target.name]: e.target.value })
    );
  };

  // записывает изменения в инпутах формы введения мерок
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // setParamsFormData({ ...paramsFormData, [e.target.name]: e.target.value });
    dispatch(
      setParamsFormData({ ...paramsFormData, [e.target.name]: e.target.value })
    );
  };

  // дозаписывает изменения в кастомизированных формах
  // имеется в виду для брюк добавляет седло
  // для пальто и шуб утепление, etc
  const handleCustomFormChange = (updatedFields: ICustomFormInputs): void => {
    dispatch(setParamsFormData({ ...paramsFormData, ...updatedFields }));
  };

  // отслеживает изменения в инпутах формы адреса доставки
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      setAddressInputs({ ...addressInputs, [e.target.name]: e.target.value })
    );
  };

  // отслеживает чекбокс Срочный пошив
  const handleUrgentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUrgentMaking(e.target.checked));
  };

  // отслеживает радио кнопки доставки - шоурум или сдек
  const handleDeliveryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSelectedDelivery(e.target.value));
  };

  // рассчитывает стоимость доставки, если в шоурум - 0, если по адресу считает 300
  const countDeliveryCost = (): void => {
    if (selectedDelivery === 'showroom') {
      dispatch(setDeliveryCost(0));
      dispatch(setShowAddressInputs(false));
    } else {
      dispatch(setDeliveryCost(300));
      dispatch(setShowAddressInputs(true));
    }
  };

  // отслеживает изменения в блоке Комментарии
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setCommentsInput(e.target.value));
  };

  // отрабатывает по клику на СОХРАНИТЬ при введении мерок
  const handleSaveSizesInputs = async (
    index: number,
    itemId: number
  ): Promise<void> => {
    dispatch(setParamsFormData({ ...paramsFormData, itemId: itemId }));
    if (!user) {
      // введенные мерки сохраняются в локалсторедж к соответствующим товарам
      const itemsLocal = localStorage.getItem('cartItems');
      if (itemsLocal !== null) {
        const cartItems = JSON.parse(itemsLocal) || [];
        const itemToUpdate = cartItems.find(
          (item: ILocalStorageCartItem) => item.id === itemId
        );
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
        const userParamsText = `Ваш рост: ${
          paramsFormData.height
        }см, длина изделия: ${paramsFormData.length}см, длина рукава: ${
          paramsFormData.sleeve
        }см, объем груди: ${paramsFormData.bust}см, объем талии: ${
          paramsFormData.waist
        }см, объем бедер: ${paramsFormData.hips}см${
          paramsFormData.saddle ? `, седло: ${paramsFormData.saddle}` : ''
        }${
          paramsFormData.lining ? `, утепление: ${paramsFormData.lining}` : ''
        }${
          paramsFormData.buttons ? `, фурнитура: ${paramsFormData.buttons}` : ''
        }${paramsFormData.loops ? `, со шлёвками` : ''}`;
        const updatedUserParams = [...userParams];
        updatedUserParams[index] = userParamsText;
        dispatch(setUserParams(updatedUserParams));
        setParamsFormData({});
        handleDisplaySizesForm(index, itemId);
      }
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
      const userParamsText = `Ваш рост: ${res.height}см, длина изделия: ${
        res.length
      }см, длина рукава: ${res.sleeve}см, объем груди: ${
        res.bust
      }см, объем талии: ${res.waist}см, объем бедер: ${res.hips}см${
        res.saddle ? `, седло: ${res.saddle}` : ''
      }${res.lining ? `, утепление: ${res.lining}` : ''}${
        res.buttons ? `, фурнитура: ${res.buttons}` : ''
      }${res.loops ? `, со шлёвками` : ''}`;
      // setUserParams((prevTexts) => {
      //   const updatedTexts = [...prevTexts];
      //   updatedTexts[index] = userParams;
      //   return updatedTexts;
      // });
      const updatedUserParams = [...userParams];
      updatedUserParams[index] = userParamsText;
      dispatch(setUserParams(updatedUserParams));
      handleDisplaySizesForm(index, itemId);
    }
  };

  // отслеживает инпут промокода
  const handlePromocodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPromocode(e.target.value.trim()));
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
        dispatch(setDiscountPercent(response.percent / 100));
        dispatch(setPromoUsed(true));
        dispatch(setPromocode(''));
      } else {
        // если ошибка с бека
        dispatch(setPromocodeErr(response));
        setTimeout(() => {
          setDbPc('');
          dispatch(setPromoUsed(false));
          dispatch(setPromocodeErr(''));
        }, 1000);
        dispatch(setCartTotal(subtotal));
      }
    } else if (promoUsed) {
      // если пользователь уже ввел 1 промокод
      dispatch(setPromocodeErr('Вы уже использовали промокод'));
      setTimeout(() => {
        setDbPc('');
        dispatch(setPromoUsed(false));
        dispatch(setPromocodeErr(''));
      }, 1000);
    } else {
      // если отправляет пустую строку
      dispatch(setPromocodeErr('Вы не ввели промокод'));
      setTimeout(() => {
        dispatch(setPromocodeErr(''));
      }, 1000);
    }
  };

  //!  отправляет письмо с подтверждением заказа
  // TODO ошибка типизации
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
    setShowSpinner(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}order/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const re = await response.json();

      if (re.message === 'Что-то пошло не так, попробуйте позже') {
        // если ошибка на беке
        setShowSpinner(false);
        dispatch(setOrderStatus(re.message));
        setTimeout(() => {
          dispatch(setOrderStatus(''));
        }, 2000);
      } else if (re.message === 'Вы уже использовали этот промокод') {
        setShowSpinner(false);
        dispatch(setOrderStatus(re.message));
        dispatch(setPromoUsed(false));
        setDbPc('');
        dispatch(setDiscount(0));
        setTimeout(() => {
          dispatch(setOrderStatus(''));
        }, 2000);
      } else {
        // если все ок - очищает корзину, массив в редаксе и редиректит на спасибку
        setTimeout(() => {
          setShowSpinner(false);
          router.push('/thankyou');
        }, 1200);
        await dispatch(emptyCartThunk(user));
        await dispatch(emptyCart());
        localStorage.setItem('cartItems', JSON.stringify([]));
        // TODO ошибка типизации
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
        const localData = JSON.parse(localStorage.getItem('cartItems') || '[]');
        isMeasuresAdded = localData
          .filter((item: ILocalStorageCartItem) => !item.in_stock)
          .every((oneItem: ILocalStorageCartItem) => {
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
        if (!isMeasuresAdded) {
          dispatch(
            setOrderStatus('Пожалуйста, введите все мерки для пошива изделия')
          );
          setTimeout(() => {
            dispatch(setOrderStatus(''));
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
            const itemsWithMeasurements = JSON.parse(
              localStorage.getItem('cartItems') || '[]'
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
            if (
              !personalData.name ||
              !personalData.email ||
              !personalData.password ||
              !personalData.phone
            ) {
              dispatch(
                setOrderStatus('Пожалуйста, заполните все поля личных данных')
              );
              setTimeout(() => {
                dispatch(setOrderStatus(''));
              }, 2000);
            } else {
              createOrder(orderData);
            }
          }
        }
      } else {
        // если адрес доставки некорректный
        dispatch(setOrderStatus('Пожалуйста, заполните адрес доставки'));
        setTimeout(() => {
          dispatch(setOrderStatus(''));
        }, 2000);
      }
    } else {
      // если не выбран способ доставки
      dispatch(setOrderStatus('Пожалуйста, выберите способ доставки'));
      setTimeout(() => {
        dispatch(setOrderStatus(''));
      }, 2000);
    }
  };

  return {
    showSpinner,
    delError,
    setDelError,
    dbPc,
    setDbPc,
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
};
