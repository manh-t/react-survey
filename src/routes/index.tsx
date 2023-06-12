import React from 'react';
import { RouteObject } from 'react-router-dom';

import SignInScreen from 'screens/SignIn';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SignInScreen />,
  },
];

export default routes;
