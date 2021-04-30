import { IAuth, IAuthResponse } from "src/types/auth";
import axios from "axios";
import IUser from "src/types/user";

type IAuthApi = {
  signin(user: IAuth): Promise<IAuthResponse>
  resetPassword(user: IAuth): Promise<IAuthResponse>
  forgotPassword(user: IAuth): Promise<IAuthResponse>
  register(user: IUser): Promise<IAuthResponse>
}

const AuthApi = (): IAuthApi => {
  const authApi = '/auth'

  const signin = (user: IAuth): Promise<IAuthResponse> => axios.post(`${authApi}/signin`, user)

  const resetPassword = (user: IAuth): Promise<IAuthResponse> => axios.post(`${authApi}/resetPassword`, user)

  const forgotPassword = (user: IAuth): Promise<IAuthResponse> => axios.post(`${authApi}/forgoPassword`, user)

  const register = (user: IUser): Promise<IAuthResponse> => axios.post(`${authApi}/register`, user)

  return { signin, resetPassword, register, forgotPassword}
}

export default AuthApi()