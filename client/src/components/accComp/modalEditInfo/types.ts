import { IUserInfo } from '../profile/UserDataTypes';

export interface IInputsEditInfo {
  full_name: string;
  phone: string;
  address?: string;
  telegram?: string;
}

export interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo?: IUserInfo | undefined;
  setUserInfo?: React.Dispatch<React.SetStateAction<IUserInfo | undefined>>;
}
