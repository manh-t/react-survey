import React from 'react';
import { RouteObject } from 'react-router-dom';

import DashBoardScreen from 'screens/Dashboard';
import SignInScreen from 'screens/SignIn';
import SurveyScreen from 'screens/Survey';

import ProtectedRoute from './ProtectedRoute';

export const paths = {
  root: '/',
  signIn: '/sign-in',
  survey: '/surveys/:id',
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
  {
    path: paths.survey,
    element: <SurveyScreen />,
  },
];

export default routes;
