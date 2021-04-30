import IUser from "./user"

export type IAuth = {
  email: string
  password: string
  confirmPassword?: string
  resetPasswordToken?: string
  code?: string
}

export type IAuthResponse = {
  token: string,
  user: IUser,
  status: String
}

export const AuthInitialValue: IAuth = {
  email: '',
  confirmPassword: '',
  password: '',
  resetPasswordToken: '',
  code: ''
}