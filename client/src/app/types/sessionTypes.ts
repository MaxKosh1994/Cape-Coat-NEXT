import { Action, AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ISessionState {
  user: string;
  name: string;
  error: string;
  session: boolean;
  isAdmin: boolean;
}

export interface ISignInThunkAction {
  email: string;
  isAdmin: boolean;
  name: string;
  message?: string;
}

export type SignInThunk<ReturnType = ISignInThunkAction | Promise<any>> =
  ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export interface ISignUpThunkAction {
  email: string;
  isAdmin: boolean;
  name: string;
}

export type SignUpThunk<ReturnType = ISignUpThunkAction | Promise<any>> =
  ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export interface IForgotPassThunkAction {
  message: string;
}

export type ForgotPassThunk<
  ReturnType = IForgotPassThunkAction | Promise<any>
> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export interface IResetPassThunkAction {
  message: string;
  success?: boolean;
}

export type ResetPassThunk<ReturnType = IResetPassThunkAction | Promise<any>> =
  ThunkAction<ReturnType, RootState, unknown, AnyAction>;
