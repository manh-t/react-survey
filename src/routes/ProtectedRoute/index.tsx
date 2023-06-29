import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { paths } from 'routes';

// Tutorial Link:
// https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
// https://blog.logrocket.com/handling-user-authentication-redux-toolkit/
const ProtectedRoute = (): JSX.Element => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={paths.signIn} />;
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
