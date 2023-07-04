const signIn = (): void => {
  const mockTokens = {
    id: 'id',
    resourceType: 'type',
    accessToken: 'access token',
    tokenType: 'token type',
    refreshToken: 'refresh token',
  };

  window.localStorage.setItem('AuthToken', JSON.stringify(mockTokens));
};

Cypress.Commands.add('signIn', signIn);
