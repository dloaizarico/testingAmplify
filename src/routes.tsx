import React from 'react';
// import DashboardLayout from './layouts/DashboardLayout'
import BaseLayout from './views/main/baseLayout'
import Login from './views/login/login'
import SignUp from './views/signup/signup'
import { Navigate } from 'react-router-dom';
import { EditLocation } from '@material-ui/icons';
import ResetPassword from './views/resetPassword/resetPassword';
import NotFound from './views/notFound/notFound';
import ForgotPassword from './views/forgotPassword/forgotPassword'
import ConfirmEmail from './views/confirmEmail/confirmEmail'
import DashboardLayout from './views/main/dashboardLayout'
import Dashboard from './views/dashboard/dashboard'

const routes = [
  {
    path: 'ordering',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },

      // { path: 'users', element: <Users /> },
      // { path: 'users/new', element: <CreateUser /> },
      // { path: 'users/:id', element: <UserDetails /> },

      // { path: 'departments', element: <Departments /> },
      // { path: 'departments/new', element: <CreateDepartment /> },
      // { path: 'departments/:id', element: <EditDepartment /> },

      // { path: 'locations', element: <Locations /> },
      // { path: 'locations/new', element: <CreateLocation /> },
      // { path: 'locations/:id', element: <EditLocation /> },

      // { path: 'posts', element: <Posts /> },
      // { path: 'posts/new', element: <CreatePost /> },
      // { path: 'posts/:id', element: <EditPost /> },

      // { path: 'reports', element: <Reports /> },
      // { path: 'reports/:id', element: <ViewReportDetails /> },

      // { path: 'settings', element: <Settings /> },

      // { path: 'broadcast', element: <Broadcasts /> },
      // { path: 'broadcast/new', element: <CreateBroadcast /> },

      // { path: '*', element: <NotFound /> }
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
