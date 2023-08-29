import { IItem, IUser } from '@/components/accComp/orders/types';

export interface IOrderAdmin {
  Items: IItem[];
  User: IUser;
  address: string;
  comments: string;
  admin_comments: string;
  createdAt: Date;
  id: number;
  status: string;
  total: number;
  prepayment: number;
  residual_amount: number;
  updatedAt: Date;
  getReadyAt: Date;
  user_id: number;
}

export interface IOrderAdminCompProps {
  order: IOrderAdmin;
}
