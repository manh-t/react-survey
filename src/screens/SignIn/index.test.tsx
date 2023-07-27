import React from 'react';

import { render, screen } from '@testing-library/react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { paths } from 'routes';
import { AuthenticationState } from 'store/reducers/Authentication';
import TestWrapper from 'tests/TestWrapper';

import SignInScreen, { signInScreenTestIds } from '.';

const mockUseNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('hooks');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useNavigate: () => mockUseNavigate,
}));

describe('SignInScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <SignInScreen />
      </TestWrapper>
    );
  };

  const mockState: { auth: AuthenticationState } = {
    auth: {
      loading: false,
      success: false,
    },
  };

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((callback) => callback(mockState));
    (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Sign In form and its components', () => {
    render(<TestComponent />);
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
    expect(signInButton).toHaveTextContent('Sign in');

    expect(nimbleLogo).toBeVisible();
  });

  describe('given the errors field has data', () => {
    beforeEach(() => {
      mockState.auth.errors = ['error'];
    });

    it('renders the Alert', () => {
      render(<TestComponent />);

      const errorAlert = screen.getByTestId(signInScreenTestIds.errorAlert);

      expect(errorAlert).toBeVisible();
    });
  });

  describe('given the loading field has data', () => {
    describe('given loading is true', () => {
      it('renders the loading dialog', () => {
        mockState.auth.loading = true;
        render(<TestComponent />);

        const loadingDialog = screen.getByTestId(signInScreenTestIds.loadingDialog);

        expect(loadingDialog).toBeVisible();
      });
    });

    describe('given the loading is false', () => {
      it('does NOT render the loading dialog', () => {
        mockState.auth.loading = false;
        render(<TestComponent />);

        expect(screen.queryByTestId(signInScreenTestIds.loadingDialog)).not.toBeInTheDocument();
      });
    });
  });

  describe('given the success is true', () => {
    beforeEach(() => {
      mockState.auth.success = true;
    });

    it('navigates to the Dashboard screen', () => {
      render(<TestComponent />);

      expect(mockUseNavigate).toHaveBeenCalledWith(paths.root, { replace: true });
    });
  });

  describe('given the token has data', () => {
    beforeEach(() => {
      mockState.auth.token = {
        id: 'id',
        resourceType: 'type',
        accessToken: 'access token',
        tokenType: 'token type',
        refreshToken: 'refresh token',
      };
    });

    it('navigates to the Dashboard screen', () => {
      render(<TestComponent />);

      expect(mockUseNavigate).toHaveBeenCalledWith(paths.root, { replace: true });
    });
  });
});
