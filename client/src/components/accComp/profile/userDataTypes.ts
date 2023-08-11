export interface IUserInfo {
  id: number;
  email: string;
  password?: string;
  phone: string;
  full_name: string;
  address?: string;
  telegram?: string;
  admin?: boolean;
}
