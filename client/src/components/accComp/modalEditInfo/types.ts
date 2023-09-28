import { IUserInfo } from '../profile/userDataTypes';

export interface IInputsEditInfo {
  full_name: string;
  phone: string;
  address?: string;
  telegram_instagram?: string;
}

export interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo?: IUserInfo | undefined;
  setUserInfo?: React.Dispatch<React.SetStateAction<IUserInfo | undefined>>;
}
