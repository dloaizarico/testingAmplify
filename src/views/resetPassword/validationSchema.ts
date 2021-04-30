import * as Yup from 'yup'

export default Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
})