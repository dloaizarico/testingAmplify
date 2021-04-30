type IUser = {
    id: string,
    email:  string,
    name: string,
    phoneNumber: string,
    password: string,
    role: string[],
    isActive: boolean,
    confirmedPassword: string
  }
  
  export const userInitialValue: IUser = {
    id: '',
    email:  '',
    name: '',
    phoneNumber: '',
    password: '',
    role: [],
    isActive: false,
    confirmedPassword: ''
  }
  
  export default IUser