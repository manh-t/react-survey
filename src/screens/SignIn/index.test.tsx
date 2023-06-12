import React from 'react';

import { render, screen } from '@testing-library/react';

import SignInScreen from '.';

describe('SignInScreen', () => {
  it('renders learn react link', () => {
    render(<SignInScreen />);

    const logoElement = screen.getByTestId('nimble-logo-img');

    expect(logoElement).toBeInTheDocument();
  });
});
