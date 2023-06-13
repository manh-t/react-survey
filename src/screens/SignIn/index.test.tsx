import React from 'react';

import { render, screen } from '@testing-library/react';

import SignInScreen, { signInScreenTestIds } from '.';

describe('SignInScreen', () => {
  it('renders Sign In form and its components', () => {
    render(<SignInScreen />);
    const emailLabel = screen.getByTestId(signInScreenTestIds.emailLabel);
    const emailField = screen.getByTestId(signInScreenTestIds.emailField);
    const passwordLabel = screen.getByTestId(signInScreenTestIds.passwordLabel);
    const passwordField = screen.getByTestId(signInScreenTestIds.passwordField);
    const forgotButton = screen.getByTestId(signInScreenTestIds.forgotButton);
    const signInButton = screen.getByTestId(signInScreenTestIds.signInButton);
    const nimbleLogo = screen.getByTestId(signInScreenTestIds.nimbleLogo);

    expect(emailLabel).toBeVisible();
    expect(emailLabel).toHaveTextContent('Email');

    expect(emailField).toBeVisible();
    expect(emailField).toHaveAttribute('type', 'email');

    expect(passwordLabel).toBeVisible();
    expect(passwordLabel).toHaveTextContent('Password');

    expect(passwordField).toBeVisible();
    expect(passwordField).toHaveAttribute('type', 'password');

    expect(forgotButton).toBeVisible();
    expect(forgotButton).toHaveTextContent('Forgot?');

    expect(signInButton).toBeVisible();
    expect(signInButton).toHaveTextContent('Sign In');

    expect(nimbleLogo).toBeVisible();
  });
});
