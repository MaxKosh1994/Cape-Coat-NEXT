import {
  IAddressInputs,
  IParamsFormData,
  IPersonalData,
} from '@/TypeScript/checkoutTypes';

export interface ICartControlState {
  urgentMaking: boolean;
  urgencyFee: number;
  userParams: string[];
  showParamsForm: Record<number, boolean>;
  paramsFormData: IParamsFormData;
  personalData: IPersonalData;
  commentsInput: string;
  selectedDelivery: string;
  deliveryCost: number;
  showAddressInputs: false;
  addressInputs: IAddressInputs;
  promocode: string;
  promocodeErr: string;
  promoUsed: boolean;
  discount: number;
  discountPercent: number;
  twoItemDiscount: number;
  liningCost: number;
  cartTotal: number;
  orderStatus: string;
}
