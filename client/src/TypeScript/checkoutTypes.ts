export interface IParamsFormData {
  itemId?: number;
  height: string;
  length: string;
  sleeve: string;
  bust: string;
  waist: string;
  hips: string;
  saddle: string;
  loops: boolean;
  buttons: string | boolean;
  lining: string;
}

export interface IAddressInputs {
  city: string;
  street: string;
  number: string;
  flat: string;
}

export interface IPersonalData {
  name: string;
  email: string;
  phone: string;
  telegram_instagram?: string;
}

export interface IShowParamsForm {
  [itemId: number]: boolean;
}

export interface IOrderData {
  user?: string;
  personalData?: IPersonalData;
  cartTotal: number;
  addressString: string;
  commentsInput: string;
  urgentMaking: boolean;
}

export interface ICustomFormInputs {
  loops?: boolean;
  buttons?: boolean | string;
  lining?: string;
}
