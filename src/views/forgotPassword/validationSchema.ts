import * as Yup from 'yup'

export default Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
})