import { createSlice } from '@reduxjs/toolkit';
import { ICartControlState } from './types/cartControlTypes';

const initialState: ICartControlState = {
  urgentMaking: false, // чекбокс срочного пошива
  urgencyFee: 0, // стоимость срочного пошива
  userParams: [], // записывет параметры товаров по индексу в массиве
  showParamsForm: {}, // отображать форму мерок, записывает индекс в массиве
  // введенные в форму мерки
  paramsFormData: {
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
  },
  // форма для незарегистрированного пользователя
  personalData: {
    name: '',
    email: '',
    phone: '',
    password: '',
    telegram_instagram: '',
  },
  commentsInput: '', // комментарии к заказу
  selectedDelivery: 'showroom', // какая выбрана доставка
  deliveryCost: 0, // стоимость доставки
  showAddressInputs: false, // отображать или нет форму адреса
  // данные формы адреса
  addressInputs: {
    city: '',
    street: '',
    number: '',
    flat: '',
  },

  promocode: '', // введенный промокод
  promocodeErr: '', // ошибка с промокодом с бека или после проверки на фронте
  promoUsed: false, // использовал ли юзер промокод
  discount: 0, // размер скидки
  discountPercent: 0, // размер скидки в %
  twoItemDiscount: 0, // скидка за 2+ товара
  liningCost: 0, // стоимость утепления
  cartTotal: 0, // итоговая сумма корзины после скидок
  orderStatus: '', // ошибка заказа или статус
};

const cartControlSlice = createSlice({
  name: 'cartControl',
  initialState,
  reducers: {
    setUrgentMaking: (state, action) => {
      state.urgentMaking = action.payload;
    },
    setUrgencyFee: (state, action) => {
      state.urgencyFee = action.payload;
    },
    setUserParams: (state, action) => {
      state.userParams = action.payload;
    },
    setShowParamsForm: (state, action) => {
      state.showParamsForm[action.payload.itemId] = action.payload.value;
    },
    setParamsFormData: (state, action) => {
      state.paramsFormData = action.payload;
    },
    setPersonalData: (state, action) => {
      state.personalData = action.payload;
    },
    setCommentsInput: (state, action) => {
      state.commentsInput = action.payload;
    },
    setSelectedDelivery: (state, action) => {
      state.selectedDelivery = action.payload;
    },
    setShowAddressInputs: (state, action) => {
      state.showAddressInputs = action.payload;
    },
    setAddressInputs: (state, action) => {
      state.addressInputs = action.payload;
    },
    setPromocode: (state, action) => {
      state.promocode = action.payload;
    },
    setPromocodeErr: (state, action) => {
      state.promocodeErr = action.payload;
    },
    setPromoUsed: (state, action) => {
      state.promoUsed = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setDiscountPercent: (state, action) => {
      state.discountPercent = action.payload;
    },
    setTwoItemDiscount: (state, action) => {
      state.twoItemDiscount = action.payload;
    },
    setDeliveryCost: (state, action) => {
      state.deliveryCost = action.payload;
    },
    setLiningCost: (state, action) => {
      state.liningCost = action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
  },
});

export const {
  setUrgentMaking,
  setUrgencyFee,
  setUserParams,
  setShowParamsForm,
  setParamsFormData,
  setPersonalData,
  setCommentsInput,
  setSelectedDelivery,
  setDeliveryCost,
  setShowAddressInputs,
  setAddressInputs,
  setPromocode,
  setPromocodeErr,
  setPromoUsed,
  setDiscount,
  setDiscountPercent,
  setTwoItemDiscount,
  setLiningCost,
  setCartTotal,
  setOrderStatus,
} = cartControlSlice.actions;
export default cartControlSlice.reducer;
