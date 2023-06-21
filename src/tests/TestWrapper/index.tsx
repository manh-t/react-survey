import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from '@reduxjs/toolkit';

import { reducers } from 'store';

interface TestWrapperProps {
  children: React.ReactNode;
}

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({ reducer: reducers });
});

const TestWrapper = ({ children }: TestWrapperProps): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export default TestWrapper;
