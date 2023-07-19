import React, { useEffect, useState } from 'react';

import { getToken } from 'helpers/authentication';

const DashBoardScreen = (): JSX.Element => {
  // TODO This is a test. Will remove it later.
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = getToken();
    if (userToken) {
      setToken(userToken.accessToken);
    }
  }, []);
  return (
    <div>
      <p>Welcome to your Dashboard {token}</p>
    </div>
  );
};

export default DashBoardScreen;
