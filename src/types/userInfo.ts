type IUserInfo = {
  id: string,
  email: string,
  name: string,
  phoneNumber: string,
  isActive: boolean,
  role: string
}

export const userInfoInitialValues: IUserInfo = {
  id: '',
  email: '',
  name: '',
  phoneNumber: '',
  isActive: false,
  role: ''
}

export type getUsersInfoQuery = {
  user: {
    items: IUserInfo[]
    nextToken: string
  }
}

export type getUserInfoQuery = {
  user: IUserInfo
  nextToken: string
}


export default IUserInfo