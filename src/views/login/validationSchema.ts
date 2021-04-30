import * as Yup from 'yup'

export default Yup.object().shape({
  email: Yup.string().required('Code is required'),
  password: Yup.string().max(255).required('Password is required')
})