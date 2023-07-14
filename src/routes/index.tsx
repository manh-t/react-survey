import React from 'react';
import { RouteObject } from 'react-router-dom';

import DashBoardScreen from 'screens/Dashboard';
import QuestionScreen from 'screens/Question';
import SignInScreen from 'screens/SignIn';
import SurveyScreen from 'screens/Survey';

import ProtectedRoute from './ProtectedRoute';

export const paths = {
  root: '/',
  signIn: '/sign-in',
  survey: '/surveys/:id',
  question: '/surveys/:id/questions',
};

export const questionPath = (): string => {
  const questionPaths = paths.question.split('/');
  return questionPaths[questionPaths.length - 1];
};

const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.root,
        element: <DashBoardScreen />,
      },
      {
        path: paths.survey,
        element: <SurveyScreen />,
      },
      {
        path: paths.question,
        element: <QuestionScreen />,
      },
    ],
  },
  {
    path: paths.signIn,
    element: <SignInScreen />,
  },
];

export default routes;
