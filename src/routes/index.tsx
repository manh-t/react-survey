import React from 'react';
import { RouteObject } from 'react-router-dom';

import DashBoardScreen from 'screens/Dashboard';
import SignInScreen from 'screens/SignIn';

// TODO Update dashboard path to root and apply redirect if the user haven't logged in
export const paths = {
  root: '/',
  dashboard: '/dashboard',
};

const routes: RouteObject[] = [
  {
    path: paths.root,
    element: <SignInScreen />,
  },
  {
    path: paths.dashboard,
    element: <DashBoardScreen />,
  },
];

export default routes;
