export interface IUserInfo {
  id: number;
  email: string;
  password?: string;
  phone: string;
  full_name: string;
  telegram_instagram?: string;
  admin?: boolean;
}
