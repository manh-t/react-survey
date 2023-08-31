import React from 'react';
import { useRoutes } from 'react-router-dom';
import 'dummy.scss';
import 'assets/stylesheets/application.scss';
import 'rc-slider/assets/index.css';
import { ToastContainer } from 'react-toastify';

import routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  const appRoutes = useRoutes(routes);

  return (
    <>
      <ToastContainer />
      {appRoutes}
    </>
  );
};

export default App;
