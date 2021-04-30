import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('password is required'),
  confirmedPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
})