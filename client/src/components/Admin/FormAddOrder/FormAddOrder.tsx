import React from 'react';
import { Button, Checkbox, FormControl, Collapse, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { IItem } from '@/components/accComp/orders/types';
import { getAllItems } from '@/components/SearchBar/fetchSearch';
import SearchItemCard from '@/components/SearchItemCard/SearchItemCard';
import styles from './FormAddOrder.module.css';
import TrousersSizeForm from '@/components/Cart/trousersSizeForm';
import TrenchSizeForm from '@/components/Cart/trenchSizeForm';
import CoatSizeForm from '@/components/Cart/coatSizeForm';
import FurCoatSizeForm from '@/components/Cart/furCoatSizeForm';
import BackToTopArrow from '@/components/ToTopArrow/ToTopArrow';
import { clear } from 'console';
import { IPersonalData } from '@/TypeScript/checkoutTypes';

export default function FormAddOrder() {
  //! ВСЕ STATES
  // стейт для данных пользователя
  const [personalData, setPersonalData] = useState<IPersonalData>({
    name: '',
    email: '',
    number: '',
  });

  // стейт для всех товаров в выпадающий список
  const [allItems, setAllItems] = useState<IItem[]>([]);

  // стейт для выбранных товаров
  const [selectedItems, setSelectedItems] = useState<IItem[]>([]);

  // стейт для открытия/закрытия выпадающего списка
  const [isOpen, setIsOpen] = useState(false);

  // общая стоимость
  const [cartTotal, setCartTotal] = useState(0);

  // введенный промокод
  const [promocode, setPromocode] = useState('');

  // использовал ли юзер промокод
  const [promoUsed, setPromoUsed] = useState(false);

  // ошибка с промокодом
  const [promocodeErr, setPromocodeErr] = useState('');

  // размер скидки
  const [discount, setDiscount] = useState(0);

  // размер скидки в %
  const [discountPercent, setDiscountPercent] = useState(0);

  // скидка за 2+ товара
  const [twoItemDiscount, setTwoItemDiscount] = useState(0);

  // комментарии к заказу
  const [commentsInput, setCommentsInput] = useState('');

  // ошибка заказа или статус
  const [orderStatus, setOrderStatus] = useState('');

  // какая выбрана доставка
  const [selectedDelivery, setSelectedDelivery] = useState('showroom');

  // чекбокс срочного пошива
  const [urgentMaking, setUrgentMaking] = useState('');

  // стоимость срочного пошива
  const [urgencyFee, setUrgencyFee] = useState(0);

  // введенные в форму мерки
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

  // форма адреса
  const [addressInputs, setAddressInputs] = useState({
    city: '',
    street: '',
    number: '',
    flat: '',
  });

  // записывет параметры товаров по индексу в массиве
  const [userParams, setUserParams] = useState(
    Array(selectedItems.length).fill('')
  );

  // стоимость доставки
  const [deliveryCost, setDeliveryCost] = useState(0);

  // отображать или нет форму адреса
  const [showAddressInputs, setShowAddressInputs] = useState(false);

  //! --------------------------------

  //! Расчет стоимости

  useEffect(() => {
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
    // фильтруем только жакеты
    const jacketItems = selectedItems.filter((item) => item.category_id === 3);

    if (selectedItems.length > 2) {
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
    selectedItems,
    discount,
    twoItemDiscount,
    deliveryCost,
    urgentMaking,
    cartTotal,
  ]);

  //! Расчет стоимости заказа в зависимости от выбранного способа получения

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

  //! --------------------------------

  //! Хэндлеры

  // записывает изменения в инпутах формы введения мерок
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParamsFormData({ ...paramsFormData, [e.target.name]: e.target.value });
  };

  // дозаписывает изменения в кастомизированных формах
  // имеется в виду для брюк добавляет седло
  // для пальто и шуб утепление, etc
  const handleCustomFormChange = (updatedFields) => {
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

    //  const userParamsText = `Ваш рост: ${paramsFormData.height}см, длина изделия: ${paramsFormData.length}см, длина рукава: ${paramsFormData.sleeve}см, объем груди: ${paramsFormData.bust}см, объем талии: ${paramsFormData.waist}см, объем бедер: ${paramsFormData.hips}см`;
    setUserParams((prevTexts) => {
      const updatedTexts = [...prevTexts];
      updatedTexts[index] = paramsFormData;
      return updatedTexts;
    });
  };

  // записывает изменения в форме персональных данных (если клиент не залогинен)
  const handlePersonalDataInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
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

  //! --------------------------------
  //! подгрузка всех товаров в выпадающий список

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setAllItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // логика добавления в список выбранных товаров
  const isItemChecked = (item: IItem) => {
    return selectedItems.some((i) => i.id === item.id);
  };

  const handleCheckBox = (item: IItem) => {
    if (isItemChecked(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // логика открытия/закрытия списка
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  //! --------------------------------
  //! подгрузка всех доступных материалов для товара

  //! --------------------------------

  //! ГЛАВНАЯ ЛОГИКА СОЗДАНИЯ ЗАКАЗА

  const handleCreateOrder = () => {
    let addressString;
    // если доставка выбрана сдек, то склеивает данные в строку
    if (selectedDelivery === 'post') {
      addressString = `${addressInputs.city}, ${addressInputs.street} дом ${addressInputs.number}, квартира ${addressInputs.flat}`;
    } else {
      // если в шоурум, то записывает в переменную адрес шоурума
      addressString = 'Нижний Новгород, ул. Малая Покровская, 20';
    }

    if (
      personalData &&
      cartTotal &&
      addressString &&
      commentsInput &&
      urgentMaking &&
      userParams
    ) {
      const order = {
        personalData,
        cartTotal,
        addressString,
        commentsInput,
        urgentMaking,
        userParams,
      };
      console.log('====ГЛАВНАЯ КНОПКА===>', order);
    } else {
      console.log('Данных не хватает');
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <div className={styles.headerContainer}>
          <div className={styles.userParamsContainer}>
            <section
              className={`${styles.orderBlockUserParams} ${styles.orderBlockDeliveries}`}
            >
              <h2 className={styles.headerUserParams}>Данные заказчика</h2>
              <div style={{ height: '381px' }} className={styles.formBlock}>
                <div className={styles.deliveryService}>
                  <div className={styles.deliveryServiceForm}>
                    <div>
                      <div className={styles.inputLocation}>
                        <div className={styles.formControl}>
                          <label className={styles.formControlLabel}>Имя</label>
                          <input
                            role='text'
                            title='Имя'
                            placeholder=''
                            name='name'
                            className={styles.formInput}
                            onChange={handlePersonalDataInputChange}
                          />
                        </div>
                        <div className={styles.formControl}>
                          <label className={styles.formControlLabel}>
                            Email
                          </label>
                          <input
                            role='text'
                            title='Email*'
                            placeholder=''
                            name='email'
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
                              role='text'
                              title='Телефон'
                              name='phone'
                              placeholder=''
                              className={styles.formInput}
                              onChange={handlePersonalDataInputChange}
                              disabled=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className={styles.orderDataContainer}>
            <div className={styles.commentsDataContainer}>
              <section
                className={`${styles.orderBlockUserParams} ${styles.orderBlockDeliveries}`}
              >
                <h2 className={styles.headerUserParams}>
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
                        role='text'
                        title='Комментарии'
                        placeholder='Пожелания заказчика...'
                        name='comments'
                        rows='5'
                        cols='50'
                        onChange={handleCommentChange}
                      />
                    </div>
                  </label>
                </div>
              </section>
            </div>
            <div className={styles.urgentDataContainer}>
              <section
                className={`${styles.orderBlockUserParams} ${styles.orderBlockDeliveries}`}
              >
                <h2 className={styles.headerUserParams}>Срочный пошив</h2>
                <div className={styles.formBlock}>
                  <label
                    id='urgent'
                    className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
                  >
                    <input
                      type='checkbox'
                      name='urgent'
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
            </div>
          </div>
        </div>

        <div className={styles.summOrderDataContainer}>
          <section
            className={`${styles.orderBlock} ${styles.orderBlockDeliveries}`}
          >
            <h2 className={styles.deliveryHeader}>Способ доставки</h2>
            <div className={styles.formBlock}>
              <label
                className={`${styles.checkbox} ${styles.checkboxBordered} ${styles.checkboxActive} ${styles.checkboxRadio} ${styles.checkboxRight}`}
              >
                <input
                  hidden=''
                  role='radio'
                  type='radio'
                  name='delivery'
                  value='showroom'
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
              >
                <input
                  hidden=''
                  role='radio'
                  type='radio'
                  name='delivery'
                  value='post'
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
                      Точную стоимость доставки вам сообщит менеджер. Итоговая
                      сумма заказа может измениться.
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
                            role='text'
                            title='Город'
                            placeholder=''
                            name='city'
                            className={styles.formInput}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className={styles.formControl}>
                          <label className={styles.formControlLabel}>
                            Улица
                          </label>
                          <input
                            role='text'
                            title='Улица*'
                            placeholder=''
                            name='street'
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
                              role='text'
                              title='Дом'
                              name='number'
                              placeholder=''
                              className={styles.formInput}
                              onChange={handleInputChange}
                              disabled=''
                            />
                            <div className={styles.formControlButtons}></div>
                          </div>
                        </div>
                        <div className={styles.formControl}>
                          <label className={styles.formControlLabel}>
                            Квартира/Офис
                          </label>
                          <input
                            role='text'
                            name='flat'
                            title='Квартира/Офис'
                            placeholder=''
                            className={styles.formInput}
                            onChange={handleInputChange}
                            disabled=''
                          />
                          <div className={styles.formControlButtons}></div>
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

        <div className={styles.selectItemsButtonContainer}>
          <Button className={styles.button} onClick={handleToggle}>
            {isOpen ? 'Скрыть список товаров' : 'Показать список товаров'}
          </Button>
        </div>

        <div className={styles.itemListContainer}>
          <Collapse in={isOpen}>
            <Grid container spacing={2}>
              {allItems.map((item, index) => (
                <Grid item xs={3} key={index}>
                  <Checkbox
                    checked={isItemChecked(item)}
                    onChange={() => handleCheckBox(item)}
                  />
                  <SearchItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </div>

        <div className={styles.selectedItemsContainer}>
          {selectedItems.map((item, index) => (
            <div key={item.id} className={styles.oneItemConteiner}>
              <SearchItemCard key={item.id} item={item} />
              <form action=''>
                <div className={styles.sizesFormBlock}>
                  <div>
                    <label htmlFor='height' className={styles.sizesFormLabel}>
                      Ваш рост
                    </label>
                    <input
                      type='text'
                      name='height'
                      className={styles.sizesFormInput}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='length' className={styles.sizesFormLabel}>
                      Длина изделия
                    </label>
                    <input
                      type='text'
                      name='length'
                      className={styles.sizesFormInput}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='sleeve' className={styles.sizesFormLabel}>
                      Длина рукава
                    </label>
                    <input
                      type='text'
                      name='sleeve'
                      className={styles.sizesFormInput}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='bust' className={styles.sizesFormLabel}>
                      Объем груди
                    </label>
                    <input
                      type='text'
                      name='bust'
                      className={styles.sizesFormInput}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='waist' className={styles.sizesFormLabel}>
                      Объем талии
                    </label>
                    <input
                      type='text'
                      name='waist'
                      className={styles.sizesFormInput}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='hips' className={styles.sizesFormLabel}>
                      Объем бедер
                    </label>
                    <input
                      type='text'
                      name='hips'
                      className={styles.sizesFormInput}
                      onChange={handleChange}
                    />
                  </div>
                  {item.category_id === 4 && (
                    <TrousersSizeForm
                      onTrousersSizeChange={handleCustomFormChange}
                    />
                  )}
                  {item.category_id === 1 && (
                    <TrenchSizeForm
                      itemId={item.id}
                      onTrenchSizeChange={handleCustomFormChange}
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
                      onFurCoatSizeChange={handleCustomFormChange}
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
          ))}
        </div>

        <div className={styles.orderSummDataContainer}>
          <div className={`${styles.orderBlock} ${styles.orderBlockSummary}`}>
            <h1 className={styles.headerItemCart}>Стоимость заказа</h1>
            <div className={styles.promocodeInputContainer}>
              <p
                className={`${styles.orderDescription} ${styles.orderDescriptionOnlinePayment}`}
              >
                <input
                  className={styles.promocodeInput}
                  type='text'
                  placeholder='Промокод'
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
                  <span>Товары ({selectedItems.length}):</span>
                  <div className={styles.itemPrices}>
                    {(!promocodeErr && discount) || twoItemDiscount ? (
                      <>
                        <span
                          className={styles.itemPricesPrice}
                          style={{ textDecoration: 'line-through' }}
                        >
                          {selectedItems
                            .reduce((sum, item) => sum + item.price, 0)
                            .toLocaleString()}{' '}
                          &#8381;
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={styles.itemPricesPrice}>
                          {selectedItems
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
                        {(discount + twoItemDiscount).toLocaleString()} &#8381;
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
        </div>
      </FormControl>
    </>
  );
}
