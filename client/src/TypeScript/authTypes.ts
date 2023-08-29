export interface ISignInInputs {
  email: string;
  password: string;
}

export interface ISignUpInputs extends ISignInInputs {
  full_name: string;
}
