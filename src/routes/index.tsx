import React from 'react';
import { RouteObject } from 'react-router-dom';

import DashBoardScreen from 'screens/Dashboard';
import QuestionScreen from 'screens/Question';
import QuestionCompleteScreen from 'screens/Question/Complete';
import SignInScreen from 'screens/SignIn';
import SurveyScreen from 'screens/Survey';

import ProtectedRoute from './ProtectedRoute';

export const questionPath = 'questions';

export const paths = {
  root: '/',
  signIn: '/sign-in',
  survey: '/surveys/:id',
  question: `/surveys/:id/${questionPath}`,
  questionComplete: `/surveys/:id/${questionPath}/complete`,
};

export const questionCompletePath = (): string => {
  const questionCompletePaths = paths.questionComplete.split('/');
  return questionCompletePaths[questionCompletePaths.length - 1];
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
      {
        path: paths.questionComplete,
        element: <QuestionCompleteScreen />,
      },
    ],
  },
  {
    path: paths.signIn,
    element: <SignInScreen />,
  },
];

export default routes;
