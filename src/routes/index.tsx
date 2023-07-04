import React from 'react';
import { RouteObject } from 'react-router-dom';

import DashBoardScreen from 'screens/Dashboard';
import SignInScreen from 'screens/SignIn';

import ProtectedRoute from './ProtectedRoute';

export const paths = {
  root: '/',
  signIn: '/sign-in',
};

const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.root,
        element: <DashBoardScreen />,
      },
    ],
  },
  {
    path: paths.signIn,
    element: <SignInScreen />,
  },
];

export default routes;
