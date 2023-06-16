import React from 'react';
import { RouteObject } from 'react-router-dom';

import DashBoardScreen from 'screens/Dashboard';
import SignInScreen from 'screens/SignIn';

export const paths = {
  root: '/',
  signIn: '/sign-in',
};

const routes: RouteObject[] = [
  {
    path: paths.root,
    element: <DashBoardScreen />,
  },
  {
    path: paths.signIn,
    element: <SignInScreen />,
  },
];

export default routes;
