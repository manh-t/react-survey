import React from 'react';

import logo from 'assets/images/logo.svg';

const HomeScreen = (): JSX.Element => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" data-test-id="app-link">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default HomeScreen;
