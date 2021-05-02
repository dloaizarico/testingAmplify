import React from 'react';
import BaseLayout from './views/main/baseLayout'
import Login from './views/login/login'
import SignUp from './views/signup/signup'
import { Navigate } from 'react-router-dom';
import ResetPassword from './views/resetPassword/resetPassword';
import NotFound from './views/notFound/notFound';
import ForgotPassword from './views/forgotPassword/forgotPassword'
import ConfirmEmail from './views/confirmEmail/confirmEmail'
import DashboardLayout from './views/main/dashboardLayout'
import Dashboard from './views/dashboard/dashboard'
import CreateUser from 'src/views/users/create/createUser'
import UpdateUser from 'src/views/users/edit/updateUser'
import Users from 'src/views/users/users'

const routes = [
  {
    path: 'ordering',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },

       { path: 'users', element: <Users /> },
       { path: 'users/new', element: <CreateUser /> },
       { path: 'users/:id', element: <UpdateUser /> },

      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signUp', element: <SignUp /> },
      { path: 'confirmEmail/:username', element: <ConfirmEmail /> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: 'resetPassword/:resetPasswordToken', element: <ResetPassword /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/ordering/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]

export default routes;
