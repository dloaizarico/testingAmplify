import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  role: Yup.string().required('Role is required'),
  isActive: Yup.boolean().required('Status is required'),
  phoneNumber:Yup.string().required('phone number is required')
})